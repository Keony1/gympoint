export function setStudentInfo(students, id) {
  return {
    type: '@student/SET_STUDENT_INFO',
    payload: { students, id },
  };
}
