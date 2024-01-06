import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

function useAxios() {
  const axiosJWT = axios.create();
  const refresh = useRefreshToken();
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    const axiosRequest = axiosJWT.interceptors.request.use(
      async (config) => {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const axiosResponse = axiosJWT.interceptors.response.use(
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
    return () => {
      axiosJWT.interceptors.request.eject(axiosRequest);
      axiosJWT.interceptors.response.eject(axiosResponse);
    };
  }, [accessToken, axiosJWT, refresh]);

  return axiosJWT;
}

export default useAxios;
