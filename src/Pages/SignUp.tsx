import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import Title from "../components/Title/Title";
import BASE_SERVER from "../utils/Constans";

function SignUp() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("AccessToken");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (accessToken) {
      navigate("/Profile");
    }
  }, [accessToken, navigate]);

  const createUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_SERVER}/signup`, {
        username,
        password,
        email,
        tel,
      });
      setSuccess("Register success");
      const refreshToken = response.data?.refreshToken;
      console.log(response);
      console.log(refreshToken);
    } catch (err: any) {
      if (err.response?.status === 402) {
        setError("User already registered.");
      }
      if (err.response?.status === 400) {
        setError("Password must be at least 8 characters long");
      }
    }
  };

  return (
    <Title title="Register">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-bluesecond">
        <form
          onSubmit={createUser}
          className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[450px] mt-[50px] bg-white rounded-[5px]"
        >
          <Link to="/">
            <FaArrowLeft className="text-[23px] m-4 cursor-pointer" />
          </Link>
          <h1 className="text-center text-3xl font-bold mt-[-24px]">Sign Up</h1>
          <div className="w-[280px] mx-auto">
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="text"
              placeholder="user"
              ref={userRef}
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
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="text"
              placeholder="Tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <p className="text-[23px] text-green mt-2">{success}</p>
            <p className="text-[23px] text-red mt-2">{error}</p>
            <input
              type="submit"
              value="Register"
              className="w-[280px] h-[40px] text-[20px] mt-4 text-blue border-bluesecond border-[1px] duration-300 rounded-[20px] uppercase hover:bg-bluesecond hover:text-white"
            />

            <Link
              to="/Login"
              className="flex items-center justify-center w-[280px] h-[40px] text-[20px] mt-4 text-blue border-bluesecond border-[1px] duration-300 rounded-[20px] uppercase hover:bg-bluesecond hover:text-white"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </Title>
  );
}

export default SignUp;
