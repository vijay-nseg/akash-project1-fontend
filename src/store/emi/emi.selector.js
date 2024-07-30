import { createSelector } from "reselect";

const selectEmiReducer = (state) => {
  return state.emi.emiLists
};

export const selectEmi = createSelector(
  [selectEmiReducer],
  (state) => {
    return state
  }
);