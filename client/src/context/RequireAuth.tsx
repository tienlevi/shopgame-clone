import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/SignIn" state={{ path: location }} replace />
  );
}

export default RequireAuth;
