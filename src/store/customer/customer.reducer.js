import CUSTOMER_ACTION_TYPES from './customer.types';

export const CUSTOMER_INITIAL_STATE = {
  customerLists: [],
};

export const CustomerReducer = (state = CUSTOMER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CUSTOMER_ACTION_TYPES.LOAD_CUSTOMERS: {
      return { ...state, customerLists: payload };
    }
    default:
      return state;
  }
};
