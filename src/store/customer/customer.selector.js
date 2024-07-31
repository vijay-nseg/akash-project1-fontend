import { createSelector } from "reselect";

const selectCustomerReducer = (state) => {
  return state.customer.customerLists
};

export const selectCustomer = createSelector(
  [selectCustomerReducer],
  (state) => {
    return state
  }
);