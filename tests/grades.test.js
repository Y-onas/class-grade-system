import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { calculateResult, validateSubmission } from '../shared/grades.js';
import { createApp } from '../server/app.js';

const input = (marks, name = 'Hana') => ({ name, marks });

test('01: calculates the example average and returns the entered marks', () => {
  assert.deepEqual(calculateResult(input([80, 90, 70])), {
    name: 'Hana', marks: [80, 90, 70], average: 80, grade: 'B',
  });
});

test('02: grades all thresholds and values immediately below them', () => {
  for (const [mark, grade] of [[0, 'F'], [59.999, 'F'], [60, 'D'], [69.999, 'D'], [70, 'C'], [79.999, 'C'], [80, 'B'], [89.999, 'B'], [90, 'A'], [100, 'A']]) {
    assert.equal(calculateResult(input([mark])).grade, grade, `mark ${mark}`);
  }
});

test('03: display rounding cannot promote the letter grade', () => {
  const result = calculateResult(input([89.999]));
  assert.equal(result.average.toFixed(2), '90.00');
  assert.equal(result.grade, 'B');
});

test('04: accepts inclusive endpoints and equally weights marks', () => {
  assert.equal(calculateResult(input([0, 100])).average, 50);
  assert.equal(calculateResult(input([100])).grade, 'A');
});

test('05: accepts decimals and normalizes names and numeric strings', () => {
  assert.deepEqual(calculateResult(input([' 80.5 ', '90', '.5'], ' Hana ')), {
    name: 'Hana', marks: [80.5, 90, 0.5], average: 57, grade: 'F',
  });
});

test('06: rejects blank and nonstring student names', () => {
  for (const name of ['', '   ', null, undefined, 42, [], {}]) {
    assert.ok(validateSubmission({ name, marks: [80] }).name);
  }
});

test('07: rejects missing, empty and malformed mark collections', () => {
  for (const marks of [undefined, null, [], '80', {}, 80]) {
    assert.ok(validateSubmission(input(marks)).marks);
  }
  assert.ok(calculateResult(null).errors);
  assert.ok(calculateResult(undefined).errors);
});

test('08: rejects blanks, text and values that would otherwise coerce to numbers', () => {
  for (const mark of ['', ' ', 'hello', true, false, null, [], {}, '0x50', '1e2', 'NaN']) {
    assert.ok(validateSubmission(input([mark]))['marks.0'], JSON.stringify(mark));
  }
});

test('09: rejects out-of-range and nonfinite marks', () => {
  for (const mark of [-1, 100.01, Infinity, -Infinity, NaN, '-1', '101']) {
    assert.ok(validateSubmission(input([mark]))['marks.0']);
  }
});

async function withServer(run) {
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
}

const post = (base, body) => fetch(`${base}/api/results`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
});

test('10: HTTP endpoint returns a calculated result', async () => {
  await withServer(async base => {
    const response = await post(base, JSON.stringify(input([80, 90, 70])));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).average, 80);
  });
});

test('11: HTTP endpoint independently rejects invalid student data', async () => {
  await withServer(async base => {
    const response = await post(base, JSON.stringify(input([105], ' ')));
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.ok(body.errors.name);
    assert.ok(body.errors['marks.0']);
    assert.equal(body.average, undefined);
  });
});

test('12: HTTP handles malformed JSON, oversized requests and unknown routes', async () => {
  await withServer(async base => {
    const malformed = await post(base, '{');
    assert.equal(malformed.status, 400);
    assert.ok((await malformed.json()).errors.form);
    const oversized = await post(base, JSON.stringify(input([80], 'x'.repeat(17000))));
    assert.equal(oversized.status, 413);
    assert.ok((await oversized.json()).errors.form);
    const unknown = await fetch(`${base}/api/unknown`);
    assert.equal(unknown.status, 404);
    assert.ok((await unknown.json()).errors.form);
  });
});
