import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

function AdminProtectedRoute({ children }) {
  const { login, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!login) {
    return <Navigate to="/auth" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
