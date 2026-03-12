import { createBrowserRouter } from "react-router";

import AuthPage from "../pages/auth";
import DashboardPage from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  }
]);