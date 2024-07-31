import CUSTOMER_ACTION_TYPES from './customer.types';

export const setCustomerList = (customer) => {
  return { type: CUSTOMER_ACTION_TYPES.LOAD_CUSTOMERS, payload: customer };
};
