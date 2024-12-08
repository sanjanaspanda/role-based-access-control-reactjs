import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children, requiredPermission }) {
  const { user, isLoading, checkPermission } = useAuth();
  console.log("ProtectedRoute - Required Permission:", requiredPermission);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !checkPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
