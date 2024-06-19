import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/axios";

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

    const responseJWT = axiosJWT.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosJWT.interceptors.request.eject(requestJWT);
      axiosJWT.interceptors.response.eject(responseJWT);
    };
  }, [accessToken, axiosJWT, refresh]);

  return axiosJWT;
}

export default useInterceptors;
