import axios from "axios";
import { useState } from "react";
import { ApiUrl } from "../constants";

function useRefreshToken() {
  const [accessToken, setAccessToken] = useState<string>("");

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    try {
      const response = await axios.post(`${ApiUrl}/api/refresh`, {
        refreshToken,
      });
      const newAccessToken = response.data?.accessToken;
      localStorage.setItem("AccessToken", newAccessToken);
      setAccessToken(newAccessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
}

export default useRefreshToken;
