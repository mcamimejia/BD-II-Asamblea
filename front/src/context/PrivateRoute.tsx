import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    navigate('/');
    return
  }

  return children;
};

export default PrivateRoute;