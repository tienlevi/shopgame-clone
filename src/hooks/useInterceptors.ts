import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

function useAxios() {
  const axiosJWT = axios.create();
  const refresh = useRefreshToken();
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
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
        const newAccessToken = await refresh();
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            axiosJWT.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return prevRequest;
          } catch (err) {
            console.log(err);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [accessToken, axiosJWT, refresh]);

  return axiosJWT;
}

export default useAxios;
