# Testing — Job 04

The original estimate was 1 hour and 12 test cases. Automated checks validate calculation rules and the backend; browser checks cover the interactive interface.

## Automated cases

| Case | Coverage |
| --- | --- |
| 01 | Example calculation: 80, 90, 70 → 80.00 and B |
| 02 | All grade thresholds and values just below each threshold |
| 03 | Display rounding does not change the grade |
| 04 | Inclusive 0 and 100 endpoints and equal weighting |
| 05 | Decimal marks and normalization of input |
| 06 | Blank and nonstring names |
| 07 | Empty, missing and malformed mark collections |
| 08 | Blank marks, text, null, booleans and other invalid types |
| 09 | Out-of-range and nonfinite marks |
| 10 | Successful HTTP calculation |
| 11 | Independent server-side validation with field errors |
| 12 | Malformed JSON, request-size limit and unknown API routes |

Run with `npm test`. Tests use local ephemeral ports and close their servers afterward.

## Verification record — 2026-10-30

- JavaScript syntax checks: passed for server files, shared calculation code and tests.
- Automated test execution: **12 passed, 0 failed** with `npm test`. Local HTTP access was required; the sandbox initially blocked the three HTTP cases, which passed when rerun with the required access.
- Production build: **passed** with `npm run build` using Vite 7.3.7.
- Development startup: passed; server printed its local ready URL.
- Production startup and HTTP smoke check: **passed**. `npm start` served the homepage with HTTP 200, and submitting Hana's marks of 80, 90 and 70 returned average 80 and grade B.
- Browser verification: **not completed**. The in-app browser failed to attach initially, then timed out reaching the sandboxed preview. Production HTTP checks succeeded after starting the server outside the sandbox. Visual layout and interactive browser checks below remain unverified.

Installation note: the registry could not provide a dependency for the newest Vite release. The project uses Vite 7.3.7 instead. Optional peer dependency resolution was skipped during installation; the app is JavaScript and does not require optional Node.js type definitions. The lockfile records installed versions.

## Browser checks

Check the example result, an invalid blank form, a mark above 100, add/remove fields, clearing the form and clearing a result after an input edit. Verify that the page is usable at narrow widths, errors have readable labels, and results are announced through a live region. Network-failure messaging and stale-request handling should also be checked when changing request behavior.
