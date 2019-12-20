import producer from 'immer';

export default function enrollment(state = {}, action) {
  return producer(state, draft => {
    switch (action.type) {
      case '@enrollment/SET_ENROLLMENT': {
        const { enrollments, id } = action.payload;
        draft.enrollment = enrollments.find(enrollment => enrollment.id === id);
        break;
      }
      default:
    }
  });
}
