import axios from "axios";
import { useState } from "react";
import BASE_SERVER from "../utils/Constans";

function RefreshToken() {
  const [accessToken, setAccessToken] = useState<string>("");

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    try {
      const response = await axios.post(`${BASE_SERVER}/refresh`, {
        refreshToken,
      });
      const newAccessToken = response.data?.accessToken;
      console.log(newAccessToken);
      localStorage.setItem("AccessToken", newAccessToken);
      setAccessToken(newAccessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
}

export default RefreshToken;
