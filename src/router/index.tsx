import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import Login from "@/views/Login";
import { NotFound } from "@/components";
import BaseLayout from "@/Layout";
import UserManagement from "@/views/User";
import Department from "@/views/Department";
import MenuManagement from "@/views/Menu";
import RoleManagement from "@/views/Role";
import Dashboard from "@/views/Dashboard";

const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/user",
        element: <UserManagement />,
      },
      {
        path: "/department",
        element: <Department />,
      },
      {
        path: "/menu",
        element: <MenuManagement />,
      },
      {
        path: "/role",
        element: <RoleManagement />,
      },
    ],
  },
  { path: "/", element: <Navigate to="/welcome" /> },
  { path: "/login", element: <Login /> },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
