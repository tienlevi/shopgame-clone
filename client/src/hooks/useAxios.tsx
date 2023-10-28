import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

function useAxios() {
  const axiosJWT = axios.create();
  const refresh = useRefreshToken();
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    const requestIntercept = axiosJWT.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosJWT.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403) {
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return prevRequest;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosJWT.interceptors.request.eject(requestIntercept);
      axiosJWT.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, axiosJWT, refresh]);

  return axiosJWT;
}

export default useAxios;
