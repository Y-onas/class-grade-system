# Student Grade Management System — Project Plan & Job Number Log

This project answers Part 2 question (ii). It uses React for the user interface and Node.js with Express for the backend.

- **Total Estimated Hours:** 14.50 hours
- **Total Actual Hours:** 20.50 hours (1,230 net minutes) across 3 days
- **Schedule Breakdown:**
  - **Day 1:** Requirements Analysis (1.0 hr) + Design (5.0 hrs) = 6.0 hrs
  - **Day 2:** Implementation (12.0 hrs) = 12.0 hrs
  - **Day 3:** Testing (2.0 hrs) + Documentation (0.5 hr / 30 min) = 2.5 hrs

---

## Schedule and Job Number Log

| Job | Day | Phase / Work Description | Estimated hours | Expected work-product units | Actual hours | Actual units | To Date actual hours |
| :---: | :---: | :--- | :---: | :--- | :---: | :--- | :---: |
| **01** | Day 1 | Requirements analysis: define inputs, outputs, validation rules and grading scale | 1.00 | 8 requirements | 1.00 | 8 requirements | 1.00 |
| **02** | Day 1 | Design: UI wireframe, data flow architecture, REST API specification | 3.00 | 1 design document | 5.00 | 1 design document | 6.00 |
| **03** | Day 2 | Implementation: React frontend and Node.js Express backend | 9.00 | 200 source lines | 12.00 | 314 source lines | 18.00 |
| **04** | Day 3 | Testing: automated unit & HTTP test suite, validation checks | 1.00 | 12 test cases | 2.00 | 12 passing test cases | 20.00 |
| **05** | Day 3 | Documentation: user guide, run commands, and coursework logs | 0.50 | 1 user guide | 0.50 | 1 user guide | 20.50 |
| **Total** | | **All 5 Phases Completed** | **14.50** | *(Units use different measures; do not sum)* | **20.50** | **All work units completed** | **20.50** |

---

## Variance Analysis & Observations

1. **Requirements (1.0 hr actual vs 1.0 hr estimate):** Accurately estimated. 8 functional requirements (R1–R8) and provisional grading boundaries fully documented.
2. **Design (5.0 hrs actual vs 3.0 hrs estimate, +2.0 hrs):** Took longer due to detailed state diagramming (idle, submitting, error, result), accessible keyboard interaction design, and REST request/response contracts.
3. **Implementation (12.0 hrs actual vs 9.0 hrs estimate, +3.0 hrs on Day 2):** Produced 314 source lines (114 lines over the 200-line initial estimate). Additional time invested into dynamic form field insertion/removal, real-time client-side feedback, server validation error mapping, and Vite dev integration.
4. **Testing (2.0 hrs actual vs 1.0 hr estimate, +1.0 hr):** 12 automated test cases written and executed covering rounding thresholds, extreme values, malicious/malformed inputs, and HTTP status codes.
5. **Documentation (30 mins / 0.5 hr actual vs 0.5 hr estimate):** Completed on time, providing setup steps, architecture explanations, and PSP logs.
