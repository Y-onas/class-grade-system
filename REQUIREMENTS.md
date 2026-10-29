# Requirements — Job 01

## Purpose

Build a small Student Grade Management System that accepts student marks, calculates an average and letter grade, validates input and displays results.

## Technology and scope

- Frontend: React.
- Backend: Node.js with Express.
- Process one student's result at a time using equally weighted marks.
- Keep the initial project small: records exist for the current interaction only. Database storage, accounts and class ranking can be considered later if required.

## Functional requirements

| ID | Requirement |
| --- | --- |
| R1 | Accept a student name and reject a name that is empty after trimming whitespace. |
| R2 | Accept one or more marks, allowing the user to add or remove mark fields. At least one mark must remain. |
| R3 | Reject missing marks, nonnumeric values, nonfinite numbers, and marks outside the inclusive range 0–100. Accept decimals. |
| R4 | Calculate the arithmetic mean: sum of accepted marks divided by the number of marks. |
| R5 | Assign a letter grade using the unrounded mean and the provisional scale below. |
| R6 | Display the student name, entered marks, average to two decimal places and letter grade. Rounding is for display only. |
| R7 | Show clear input errors in React and validate every request again on the Node.js backend. Invalid requests must not produce a calculated result. |
| R8 | Let the user clear the form and result to enter another student. When input changes, clear the previous result so it cannot be mistaken for the new result. |

## Provisional grading scale

The assignment image does not specify grade thresholds. The implementation uses the following assumed scale; confirm it with your course before submission.

| Average | Grade |
| --- | --- |
| 90–100 | A |
| 80 up to but below 90 | B |
| 70 up to but below 80 | C |
| 60 up to but below 70 | D |
| Below 60 | F |

## Worked examples

- Student: Hana. Marks: 80, 90, 70. Average = (80 + 90 + 70) / 3 = **80.00**. Grade = **B**.
- A mark of 105 must show an error explaining that marks must be between 0 and 100.
- An empty mark must show an error; it must not silently become zero.
- An average of 89.999 displays as 90.00 but remains grade B because grading uses the unrounded value. Include a short explanation of this rule beside the displayed result.

## Completion check

Requirements review is complete once you have checked the scope and grading assumptions and can explain each requirement. Then enter actual time and the final number of requirements in the Job Number Log.
