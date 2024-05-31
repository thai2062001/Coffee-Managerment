import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "./components/DecodeToken";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = decodeToken();
  if (allowedRoles.includes(role)) {
    return children;
  }
  return <Navigate to="/login" />; // Redirect to home or login page
};

export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[1]}>{children}</ProtectedRoute>
);

export const StaffRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[2]}>{children}</ProtectedRoute>
);
