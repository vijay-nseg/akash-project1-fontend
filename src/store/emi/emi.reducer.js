import EMI_ACTION_TYPES from './emi.types';

export const EMI_INITIAL_STATE = {
  emiLists: [],
};

export const EmiReducer = (state = EMI_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case EMI_ACTION_TYPES.LOAD_EMIS: {
      return { ...state, emiLists: payload };
    }
    default:
      return state;
  }
};
