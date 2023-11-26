import axios from "axios";

function RefreshToken() {
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    if (!refreshToken) {
      return null;
    }
    try {
      const response = await axios.post("http://localhost:5000/refresh", {
        refreshToken,
        withCredentials: true,
      });
      const accessToken = response.data?.accessToken;
      console.log(accessToken);
      localStorage.setItem("AccessToken", accessToken);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
}

export default RefreshToken;
