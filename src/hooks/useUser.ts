import { useState, useEffect } from "react";
import useInterceptors from "./useInterceptors";
import { ApiUrl } from "../constants";
import { useNavigate } from "react-router-dom";

function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const api = useInterceptors();
  const accessToken = localStorage.getItem("AccessToken");

  const getUser = async () => {
    try {
      const response = await api.get(`${ApiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setUser(response.data?.user);
      setIsLoading(false);
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      if (err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [accessToken]);

  return { user, setUser, isLoading, error };
}

export default useUser;
