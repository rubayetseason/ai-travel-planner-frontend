import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "@/constants/accessKey";
import { routesList } from "@/constants/routeList";

/**
 * ProtectedRoute: If token missing -> redirect to login.
 * If token present -> render nested routes via <Outlet />.
 */
export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!token) {
    return <Navigate to={routesList.auth} replace />;
  }

  return <Outlet />;
};

/**
 * AuthRoute: Use for the login (auth) page.
 * If user is already logged in, redirect to dashboard.
 * Otherwise render children (the login page).
 *
 * Usage: <AuthRoute><LoginPage /></AuthRoute>
 */
export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    return <Navigate to={routesList.dashboard} replace />;
  }

  return <>{children}</>;
};
