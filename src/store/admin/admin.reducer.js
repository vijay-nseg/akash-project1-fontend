import ADMIN_ACTION_TYPES from './admin.types';

export const ADMIN_INITIAL_STATE = {
  adminLists: [],
};

export const AdminReducer = (state = ADMIN_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_ACTION_TYPES.LOAD_ADMINS: {
      return { ...state, adminLists: payload };
    }
    default:
      return state;
  }
};
