import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

function useAxios() {
  const axiosJWT = axios.create();
  const refresh = useRefreshToken();

  useEffect(() => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        const data = await refresh();
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${data}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosJWT.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 || !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosJWT(prevRequest);
        }
        return Promise.reject(error);
      }
    );
  }, [refresh]);

  return axiosJWT;
}

export default useAxios;
