import { Outlet, Navigate, useLocation } from "react-router-dom";

function useAuth() {
  const accessToken = localStorage.getItem("AccessToken");
  const location = useLocation();

  return accessToken === null ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default useAuth;
