import axios from "axios";
import { useState } from "react";

function RefreshToken() {
  const apiUrl: any = (import.meta as any).env?.BASE_SERVER;
  const [accessToken, setAccessToken] = useState<string>("");

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    try {
      const response = await axios.post(`${apiUrl}/api/refresh`, {
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

export default RefreshToken;
