import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  if (user[0]?.token) {
    return <Navigate to="/audit/dashboard" />;
  }
  return children;
};

export default AuthProtectedRoutes;
