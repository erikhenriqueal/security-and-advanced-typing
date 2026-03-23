import { createBrowserRouter } from "react-router";

import AuthPage from "../pages/auth";
import DashboardPage from "../pages/dashboard";
import DashboardUsersPage from "../pages/dashboard/users";
import { DataProvider } from "../components/DataContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />
  }, {
    path: "/dashboard",
    element: <DataProvider><DashboardPage /></DataProvider>
  }, {
    path: "/dashboard/users",
    element: <DashboardUsersPage />
  }
]);