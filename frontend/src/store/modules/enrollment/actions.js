export function setEnrollment(enrollments, id) {
  return {
    type: '@enrollment/SET_ENROLLMENT',
    payload: { enrollments, id },
  };
}
