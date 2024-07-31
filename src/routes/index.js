import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import CustomerRoutes from "views/customer/CustomerRoutes";
import EmiRoutes from "views/emi/EmiRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    MainRoutes,
    AuthenticationRoutes,
    CustomerRoutes,
    EmiRoutes,
  ]);
}
