import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import { CustomerReducer } from "./customer/customer.reducer"; 
import { EmiReducer } from "./emi/emi.reducer";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  customer: CustomerReducer, 
  emi:EmiReducer,
});

export default reducer;
