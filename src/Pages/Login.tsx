import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import Title from "../components/Title/Title";
import useAuth from "../hooks/useAuth";

function Login() {
  const { user, setUser }: any = useAuth();
  const apiUrl: any = (import.meta as any).env?.BASE_SERVER;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("AccessToken");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (token) {
      navigate("/Profile");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/login`,
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      setUser(user);
      navigate("/");
      localStorage.setItem("RefreshToken", refreshToken);
      localStorage.setItem("AccessToken", accessToken);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("username and password are incorrect");
      }
      if (err.response?.status === 500) {
        setError("Server error");
      }
    }
  };

  return (
    <Title title="Login">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-bluesecond">
        <form
          onSubmit={handleSubmit}
          className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[450px] mt-[50px] bg-white rounded-[5px]"
        >
          <Link to="/">
            <FaArrowLeft className="text-[23px] m-4 cursor-pointer" />
          </Link>
          <h1 className="text-center text-3xl font-bold mt-[-24px]">Sign In</h1>
          <div className="w-[280px] mx-auto">
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="text"
              placeholder="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-[23px] text-red mt-2">{error}</p>
            <button className="w-[280px] h-[40px] text-[20px] mt-4 text-blue border-bluesecond border-[1px] duration-300 rounded-[20px] uppercase hover:bg-bluesecond hover:text-white">
              Login
            </button>
            <div className="mt-2">
              <p className="text-[17px] text-lightBlue text-right">
                Forgot account ?
              </p>
              <p className="text-[17px] text-center mt-2">
                You don't have an account ?
                <Link
                  className="text-lightBlue ml-1 decoration-auto"
                  to="/SignUp"
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-[20px] text-center mt-2">OR</p>
              <div className="flex justify-center mt-[17px]">
                <FaGoogle className="text-[26px] mx-[10px] cursor-pointer" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Title>
  );
}

export default Login;
