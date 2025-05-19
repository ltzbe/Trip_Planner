import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;