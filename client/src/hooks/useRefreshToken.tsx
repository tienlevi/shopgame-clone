import { useAuth } from "../context/Auth";
import axios from "axios";

function RefreshToken() {
  const auth = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/refresh",
        {
          token: auth?.refreshToken,
        },
        { withCredentials: true }
      );
      const newAccessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      console.log(auth?.refreshToken);
      auth?.login(newAccessToken);
      localStorage.setItem("AccessToken", newAccessToken);
      localStorage.setItem("RefreshToken", refreshToken);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
}

export default RefreshToken;
