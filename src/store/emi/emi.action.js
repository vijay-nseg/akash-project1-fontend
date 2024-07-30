import EMI_ACTION_TYPES from './emi.types';

export const setEmiList = (emi) => {
  return { type: EMI_ACTION_TYPES.LOAD_EMIS, payload: emi };
};
