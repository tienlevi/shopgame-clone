import axios from "axios";

function RefreshToken() {
  const refresh = localStorage.getItem("RefreshToken");

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/refresh",
        {
          token: refresh,
        },
        { withCredentials: true }
      );
      const newAccessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      localStorage.setItem("AccessToken", newAccessToken);
      localStorage.setItem("RefreshToken", refreshToken);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
}

export default RefreshToken;
