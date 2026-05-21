import type { JSX } from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;