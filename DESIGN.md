# Design — Job 02

## Screen layout

```text
GRADEBOOK                         Student results
Student Grade Management
Enter marks. See the whole picture.

STUDENT DETAILS                   RESULT
Student name [____________]        Student name
                                  Average     Letter grade
MARKS                             Entered marks
Mark 1 [____] /100 [Remove]        Grading rule explanation
Mark 2 [____] /100 [Remove]
Mark 3 [____] /100 [Remove]         GRADING SCALE
[+ Add mark]                       A 90–100, B 80–<90, ...
[Calculate result] [Clear]
```

On narrow screens, the result appears below the form. Labels, visible keyboard focus, inline errors and live result announcements support accessible use.

## Data flow

1. React holds the student name and editable marks as strings so empty fields stay empty.
2. Shared validation checks the values before a request is made. React shows field-specific errors.
3. React sends valid values to `POST /api/results` on the same origin.
4. Node.js and Express independently validate the request, normalize values, calculate the mean and assign a grade.
5. React displays the response. Editing or clearing the form clears old results and aborts any outstanding request.

The form has idle, submitting, error and result states. A request identifier prevents outdated responses from replacing a newer result. Records are not persisted.

## API

`POST /api/results`, content type `application/json`:

```json
{ "name": "Hana", "marks": [80, 90, 70] }
```

Successful response (HTTP 200):

```json
{ "name": "Hana", "marks": [80, 90, 70], "average": 80, "grade": "B" }
```

Validation failure (HTTP 400):

```json
{ "errors": { "marks.0": "Enter a mark between 0 and 100." } }
```

The endpoint accepts finite numeric values and decimal numeric strings. Blank strings, booleans, objects and null are rejected. Requests are limited to 16 KB. Malformed JSON returns a readable JSON error; unknown API routes return HTTP 404.

## Calculation

Average = sum of marks / number of marks. Apply A at 90, B at 80, C at 70, D at 60, otherwise F. Compare the unrounded average; format only the displayed number to two decimal places. This scale is an assignment assumption because the supplied question does not define thresholds.

## Structure

- `src/`: React interface and CSS.
- `shared/grades.js`: validation and calculation functions.
- `server/app.js`: API and HTTP error handling.
- `server/index.js`: local server, Vite development middleware and production static files.
- `tests/`: calculation, validation and HTTP tests.

Development uses one Node.js process and one local port, 3000. Production serves Vite's built files from the same Express server.
