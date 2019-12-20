import producer from 'immer';

export default function student(state = {}, action) {
  return producer(state, draft => {
    switch (action.type) {
      case '@student/SET_STUDENT_INFO': {
        const { students, id } = action.payload;
        draft.student = students.find(student => student.id === id);
        break;
      }
      default:
    }
  });
}
