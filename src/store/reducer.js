import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import { AdminReducer } from "./admin/admin.reducer"; 
import { EmiReducer } from "./emi/emi.reducer";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  admin: AdminReducer, 
  emi:EmiReducer,
});

export default reducer;
