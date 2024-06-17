import { Outlet, Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

function ProtectedRoute() {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
