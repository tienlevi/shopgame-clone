import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "./useRefreshToken";

function useInterceptors() {
  const axiosJWT = axios.create();
  const refresh = useRefreshToken();
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    const requestJWT = axiosJWT.interceptors.request.use(
      async (config) => {
        const decodedToken: any = jwtDecode(accessToken as string);
        const currentDate = new Date();
        const newAccessToken = await refresh();
        if ((decodedToken.exp as number) * 1000 < currentDate.getTime()) {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosJWT.interceptors.request.eject(requestJWT);
    };
  }, [accessToken, axiosJWT, refresh]);

  return axiosJWT;
}

export default useInterceptors;
