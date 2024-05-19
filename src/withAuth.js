// withAuth.js
import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
  const isLoggedIn = localStorage.getItem("access-token") !== null;

  const AuthWrapper = (props) => {
    return isLoggedIn ? <Component {...props} /> : <Navigate to="/login" />;
  };

  return AuthWrapper;
};

export default withAuth;
