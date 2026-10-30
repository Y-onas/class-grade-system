export function validateSubmission(input) {
  const errors = {};
  if (typeof input?.name !== 'string' || !input.name.trim()) {
    errors.name = 'Enter the student’s name.';
  }
  if (!Array.isArray(input?.marks) || input.marks.length === 0) {
    errors.marks = 'Enter at least one mark.';
  } else {
    input.marks.forEach((mark, index) => {
      const numeric = typeof mark === 'number' ||
        (typeof mark === 'string' && /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(mark.trim()));
      if (!numeric || !Number.isFinite(Number(mark)) || Number(mark) < 0 || Number(mark) > 100) {
        errors[`marks.${index}`] = 'Enter a mark between 0 and 100.';
      }
    });
  }
  return errors;
}

export function calculateResult(input) {
  const errors = validateSubmission(input);
  if (Object.keys(errors).length) return { errors };
  const marks = input.marks.map(Number);
  const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
  const grade = average >= 90 ? 'A' : average >= 80 ? 'B' : average >= 70 ? 'C' : average >= 60 ? 'D' : 'F';
  return { name: input.name.trim(), marks, average, grade };
}
