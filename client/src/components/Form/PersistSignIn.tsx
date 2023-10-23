import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import useRefreshToken from "../../hooks/useRefreshToken";

function PersistSignIn() {
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let mouted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        mouted && setLoading(false);
      }
    };
    auth?.accessToken ? verifyRefreshToken() : setLoading(false);
    console.log(auth?.accessToken);
    return () => {
      mouted = false;
    };
  }, [auth, refresh]);

  return <>{loading ? <p>Loading...</p> : <Outlet />}</>;
}

export default PersistSignIn;
