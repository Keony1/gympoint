export function setPlanInfo(plans, id) {
  return {
    type: '@plan/SET_PLAN_INFO',
    payload: { plans, id },
  };
}
