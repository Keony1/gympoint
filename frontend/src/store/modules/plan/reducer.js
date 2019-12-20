import producer from 'immer';

export default function plan(state = {}, action) {
  return producer(state, draft => {
    switch (action.type) {
      case '@plan/SET_PLAN_INFO': {
        const { plans, id } = action.payload;
        draft.plan = plans.find(plan => plan.id === id);
        break;
      }
      default:
    }
  });
}
