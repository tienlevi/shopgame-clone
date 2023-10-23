import { useAuth } from "../context/Auth";
import axios from "axios";

function RefreshToken() {
  // const [token, setToken] = useState<Tokens[]>([]);
  const axiosJWT = axios.create();
  const auth = useAuth();
  const authencitaion = localStorage.getItem("RefreshToken");

  // useEffect(() => {
  //   const local = localStorage.getItem("RefreshToken");
  //   if (local) {
  //     setToken(JSON.parse(local));
  //   }
  // }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/refresh",
        {
          token: authencitaion,
        },
        { withCredentials: true }
      );
      const newAccessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      console.log(authencitaion);
      auth?.login(newAccessToken);
      localStorage.setItem("AccessToken", newAccessToken);
      localStorage.setItem("RefreshToken", refreshToken);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   axiosJWT.interceptors.request.use(
  //     async (config) => {
  //       const data = await refreshToken();
  //       if (!config.headers["Authorization"]) {
  //         config.headers["Authorization"] = `Bearer ${data}`;
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   axiosJWT.interceptors.request.use(
  //     (response) => response,
  //     async (error) => {
  //       const prevRequest = error?.config;
  //       if (error?.response?.status === 403 || !prevRequest?.sent) {
  //         prevRequest.sent = true;
  //         const newAccessToken = await refreshToken();
  //         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //         return axiosJWT(prevRequest);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  axiosJWT.interceptors.response.use(
    async (config) => {
      const data = await refreshToken();
      config.headers["Authorization"] = `Bearer ${data.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return refreshToken;
}

export default RefreshToken;
