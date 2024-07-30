import { createSelector } from "reselect";

const selectAdminReducer = (state) => {
  return state.admin.adminLists
};

export const selectAdmin = createSelector(
  [selectAdminReducer],
  (state) => {
    return state
  }
);