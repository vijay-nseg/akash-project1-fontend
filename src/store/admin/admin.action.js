import ADMIN_ACTION_TYPES from './admin.types';

export const setAdminList = (admin) => {
  return { type: ADMIN_ACTION_TYPES.LOAD_ADMINS, payload: admin };
};
