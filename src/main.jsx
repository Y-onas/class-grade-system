import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { validateSubmission } from '../shared/grades.js';
import './styles.css';

function App() {
  const [name, setName] = useState('');
  const [marks, setMarks] = useState(['', '', '']);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const request = useRef({ id: 0, controller: null });
  const nameInput = useRef(null);

  function invalidate() {
    request.current.controller?.abort();
    request.current.id += 1;
    setResult(null);
    setErrors({});
    setBusy(false);
  }

  function clear() {
    invalidate();
    setName('');
    setMarks(['', '', '']);
    nameInput.current.focus();
  }

  async function submit(event) {
    event.preventDefault();
    invalidate();
    const validation = validateSubmission({ name, marks });
    setErrors(validation);
    if (Object.keys(validation).length) {
      const firstField = validation.name ? 'student-name' : `mark-${Object.keys(validation)[0].split('.')[1]}`;
      document.getElementById(firstField)?.focus();
      return;
    }
    const id = request.current.id;
    const controller = new AbortController();
    request.current.controller = controller;
    setBusy(true);
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, marks: marks.map(Number) }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (id !== request.current.id) return;
      if (!response.ok) setErrors(data.errors || { form: 'Unable to calculate. Try again.' });
      else setResult(data);
    } catch (error) {
      if (error.name !== 'AbortError' && id === request.current.id) {
        setErrors({ form: 'Cannot reach the server. Check the connection and try again.' });
      }
    } finally {
      if (id === request.current.id) setBusy(false);
    }
  }

  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Gradebook home"><span className="brand-icon">G</span> Gradebook<span className="brand-dot">.</span></a>
        <span className="topbar-label">STUDENT RESULTS</span>
      </header>
      <main>
        <div className="intro"><p className="eyebrow">A LITTLE CLARITY FOR EVERY MARK</p>
          <h1>Student Grade<br /><em>Management.</em></h1>
          <p>Enter marks. Calculate an average. See the whole picture.</p>
        </div>
        <div className="workspace">
          <form className="card entry-card" onSubmit={submit} noValidate>
            <div className="card-heading"><div><span className="section-number">01 / INPUT</span><h2>Student details</h2></div><span className="pill">New result</span></div>
            <label htmlFor="student-name">Student name</label>
            <input ref={nameInput} id="student-name" value={name} placeholder="e.g. Hana Tesfaye" autoComplete="off"
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}
              onChange={(event) => { invalidate(); setName(event.target.value); }} />
            {errors.name && <p className="error" id="name-error">{errors.name}</p>}
            <div className="marks-heading"><h3>Marks</h3><span>Each mark is out of 100</span></div>
            <div className="mark-list">
              {marks.map((mark, index) => (
                <div className="mark-item" key={index}>
                  <div className="mark-row">
                    <label htmlFor={`mark-${index}`}>Mark {String(index + 1).padStart(2, '0')}</label>
                    <div className="mark-input"><input id={`mark-${index}`} type="text" inputMode="decimal" value={mark} placeholder="0–100"
                      aria-invalid={Boolean(errors[`marks.${index}`])} aria-describedby={errors[`marks.${index}`] ? `error-${index}` : undefined}
                      onChange={(event) => { invalidate(); setMarks(marks.map((value, i) => i === index ? event.target.value : value)); }} /><span>/ 100</span></div>
                    <button type="button" className="remove" disabled={marks.length === 1} aria-label={`Remove mark ${index + 1}`}
                      onClick={() => { invalidate(); setMarks(marks.filter((_, i) => i !== index)); }}>×</button>
                  </div>
                  {errors[`marks.${index}`] && <p className="error" id={`error-${index}`}>{errors[`marks.${index}`]}</p>}
                </div>
              ))}
            </div>
            <button className="add-button" type="button" onClick={() => { invalidate(); setMarks([...marks, '']); }}>+ Add another mark</button>
            {Object.keys(errors).length > 0 && <p className="error form-error" role="alert">{errors.form || errors.marks || 'Check the highlighted fields and try again.'}</p>}
            <div className="actions"><button className="primary" disabled={busy} type="submit">{busy ? 'Calculating…' : 'Calculate result'}<span aria-hidden="true">↗</span></button><button className="clear" type="button" onClick={clear}>Clear</button></div>
          </form>
          <aside className="result-column">
            <section className={`card result-card ${result ? 'has-result' : ''}`} aria-live="polite" aria-atomic="true" aria-busy={busy}>
              <span className="section-number">02 / RESULT</span>
              {result ? <>
                <h2 className="student-result-name">{result.name}</h2><p className="result-caption">Based on {result.marks.length} equally weighted {result.marks.length === 1 ? 'mark' : 'marks'}</p>
                <div className="result-numbers"><div><span>Average mark</span><strong>{result.average.toFixed(2)}<small>/100</small></strong></div><div className="grade"><span>Letter grade</span><strong>{result.grade}</strong></div></div>
                <div className="entered-marks"><span>ENTERED MARKS</span><div>{result.marks.map((mark, i) => <span className="mark-chip" key={i}>{mark}</span>)}</div></div>
                <p className="rounding-note">Grades use the unrounded average. The displayed average is rounded to two decimal places.</p>
              </> : <div className="empty-result"><div className="empty-icon" aria-hidden="true">∑</div><h2>{busy ? 'Working on your result…' : 'Your result starts here'}</h2><p>Add a student and their marks,<br />then calculate to see the result.</p><span className="empty-line" /></div>}
            </section>
            <section className="card scale-card"><div className="scale-heading"><h2>Grading scale</h2><span>REFERENCE</span></div>
              <div className="scale-grid">{[['A', '90–100'], ['B', '80–<90'], ['C', '70–<80'], ['D', '60–<70'], ['F', '<60']].map(([grade, range]) => <div className={result?.grade === grade ? 'active' : ''} key={grade}><strong>{grade}</strong><span>{range}</span></div>)}</div>
              <p>Default project scale · All marks carry equal weight.</p>
            </section>
            <p className="privacy-note"><span aria-hidden="true">○</span> Results are temporary and are not saved.</p>
          </aside>
        </div>
      </main>
      <footer><span>GRADEBOOK / STUDENT GRADE MANAGEMENT</span><span>Made for learning.</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
