import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { accessToken }: any = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
