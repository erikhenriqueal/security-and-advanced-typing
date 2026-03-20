import { createBrowserRouter } from "react-router";

import AuthPage from "../pages/auth";
import DashboardPage from "../pages/dashboard";
import DashboardUsersPage from "../pages/dashboard/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />
  }, {
    path: "/dashboard",
    element: <DashboardPage />
  }, {
    path: "/dashboard/users",
    element: <DashboardUsersPage />
  }
]);