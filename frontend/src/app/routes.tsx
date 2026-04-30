import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import  App  from "./App";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
// import { PublicRoute } from "./components/auth/PublicRoute";
import DropdownLayout from "./pages/DropdownLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // no PublicRoute
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dropdowns",
    element: (
      <ProtectedRoute>
        <DropdownLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);