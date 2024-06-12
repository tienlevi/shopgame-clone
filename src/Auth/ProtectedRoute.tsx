import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function ProtectedRoute() {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
