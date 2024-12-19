import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("jwt"); // Check if the user has a JWT token

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
