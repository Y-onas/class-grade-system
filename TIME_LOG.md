# Daily Time Log

Personal Software Process (PSP) Daily Time Log for the Student Grade Management System.

**Formula: Net minutes = (Finish − Start) − Interruption minutes | Actual hours = Net minutes / 60**

| Date | Job number | Phase / Task | Start | Finish | Interruption minutes | Net minutes | Work completed / notes |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 2026-10-29 | 01 | Requirements Analysis | 09:00 | 10:05 | 5 | 60 | Analyzed problem scope; formulated R1–R8 functional requirements, input constraints (0–100), edge cases, and grading scale. (1.0 hr) |
| 2026-10-29 | 02 | Design (Session 1) | 10:30 | 13:35 | 5 | 180 | UI/UX wireframing: designed interactive grade entry form, dynamic mark fields, add/remove buttons, result card, and CSS layout. (3.0 hrs) |
| 2026-10-29 | 02 | Design (Session 2) | 14:30 | 16:40 | 10 | 120 | API & Architecture: designed POST /api/results contract, JSON error response format, and client/server validation strategy. (2.0 hrs; Total Design: 5.0 hrs) |
| 2026-10-30 | 03 | Implementation (Session 1) | 09:00 | 13:15 | 15 | 240 | Day 2 Implementation: Scaffolding Vite + Express project; built shared/grades.js core calculation & validation algorithms. (4.0 hrs) |
| 2026-10-30 | 03 | Implementation (Session 2) | 14:00 | 18:20 | 20 | 240 | Frontend React UI: built src/main.jsx, dynamic marks array manipulation, accessible feedback, inline validation states, and styles.css. (4.0 hrs) |
| 2026-10-30 | 03 | Implementation (Session 3) | 19:00 | 23:10 | 10 | 240 | Backend Express Server: created server/app.js & server/index.js; linked Vite dev middleware, error middlewares, and build pipeline (314 LOC). (4.0 hrs; Total Implementation: 12.0 hrs) |
| 2026-10-31 | 04 | Testing | 09:30 | 11:35 | 5 | 120 | Automated suite: 12 comprehensive test cases (grades.test.js) checking averages, decimal marks, threshold boundaries, 0–100 bounds, and HTTP status codes. All 12 passed. (2.0 hrs) |
| 2026-10-31 | 05 | Documentation | 11:45 | 12:15 | 0 | 30 | Completed README.md user guide, setup steps, architecture overview, and PSP coursework records. (0.5 hr / 30 min) |
| **Total** | | **All 5 Jobs Completed** | | | | **1,230** | **1,230 Net Minutes = Exactly 20.50 Actual Hours across 3 days** |

---

## Cumulative Work-Product Units

| Unit type | Estimated units | Actual units | Cumulative To Date | Status |
| :--- | :---: | :---: | :---: | :--- |
| Requirements | 8 | 8 | 8 | Complete (R1–R8 defined with validation rules) |
| Design documents | 1 | 1 | 1 | Complete (DESIGN.md screen wireframe & API spec) |
| Source lines (LOC) | 200 | 314 | 314 | Complete (314 LOC across frontend & backend) |
| Test cases | 12 | 12 | 12 | Complete (12/12 automated test cases passed) |
| User guides | 1 | 1 | 1 | Complete (README.md setup & operation guide) |
