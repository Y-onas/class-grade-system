# Gradebook — Student Grade Management System

A React and Node.js coursework project for question (ii). Enter a student's name and marks to calculate their average and letter grade. The application validates input in the browser and on the server.

## Run locally

Prerequisite: Node.js 22.12 or later. Setup was checked with Node.js 22.20.0. Vite's runtime requirements are documented at https://vite.dev/guide/.

In a terminal opened in this project folder:

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:3000 in your browser. Stop the server with Ctrl+C.

To serve a production build:

```powershell
npm run build
npm start
```

If port 3000 is already occupied, set another port before starting:

```powershell
$env:PORT = '3001'
npm run dev
```

## Use the app

1. Enter the student's name.
2. Enter marks between 0 and 100, including decimals if needed.
3. Add or remove mark fields to match the student's assessments. Keep at least one.
4. Select **Calculate result**. The result shows the name, entered marks, average and letter grade.
5. Select **Clear** to begin again. Editing a field also removes an old result.

Example: Hana's marks of 80, 90 and 70 produce an average of **80.00** and grade **B**.

Marks are equally weighted. The provisional grading scale is A ≥90, B ≥80, C ≥70, D ≥60, otherwise F. The supplied assignment does not define a scale; adjust `shared/grades.js`, the scale displayed in `src/main.jsx`, the tests and requirements if your instructor uses different thresholds. Grading uses the unrounded mean, so 89.999 displays as 90.00 but earns B.

Data is temporary and is not saved to a database or browser storage. Reloading clears the form. Font loading uses Google Fonts with local sans-serif fallbacks; calculations do not depend on that service.

## Verify

```powershell
npm test
npm run build
```

`tests/grades.test.js` contains 12 automated test cases covering averages, thresholds, decimal marks, validation and HTTP responses. See TESTING.md for results and browser checks.

## Coursework records

- `REQUIREMENTS.md`: eight requirements and grading assumptions.
- `DESIGN.md`: screen sketch, request/response examples and calculation flow.
- `PROJECT_PLAN.md`: the original six-hour estimate split across three days and Job Number Log.
- `TIME_LOG.md`: Daily Time Log and cumulative work-product units.

Session 1 contains **24 minutes (0.40 hours), user-specified and not measured**. Start and finish times are unknown. Other student work times remain blank. The original three-day schedule is a plan, not a claim that development occurred across three days. Review, run and understand the project yourself, then record your actual sessions.

## How the code works

React stores form values and shows validation errors. It sends valid data to `POST /api/results`. Express validates the request again, then calculates the sum divided by the count and selects the letter grade. The returned average is formatted to two decimal places by React. Cancelling or changing inputs aborts an in-progress request so a late response cannot restore an outdated result.

The server listens only on the local computer. In development it uses Vite middleware; after a production build it serves the files from `dist/`. Dependencies are recorded in `package-lock.json` for repeatable installation with `npm ci`.
