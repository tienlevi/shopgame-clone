import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import Title from "../components/Title/Title";
import useAuth from "../hooks/useAuth";
import { ApiUrl } from "../constants";

interface Input {
  email: string;
  password: string;
  serverError: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<Input>({ defaultValues: { email: "", password: "" } });
  const formValue = watch();
  const { email, password } = formValue;
  const { accessToken }: any = useAuth();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [navigate, accessToken]);

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `${ApiUrl}/api/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const refreshToken = response?.data?.refreshToken;

      navigate("/");
      localStorage.setItem("RefreshToken", refreshToken);
      localStorage.setItem("AccessToken", response?.data?.accessToken);
      window.location.reload();
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("password", {
          type: "401",
          message: "Username or password incorrect",
        });
      }
      if (err.response?.status === 500) {
        setError("serverError", {
          type: "500",
          message: "Server Error",
        });
      }
    }
  };

  return (
    <Title title="Login">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-bluesecond">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] py-5 mt-[50px] bg-white rounded-[5px]"
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
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-[20px] text-red mt-2">email is required</p>
            )}
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-[20px] text-red mt-2">username is required</p>
            )}
            {errors.password && (
              <p className="text-[20px] text-red mt-2">
                {errors.password.message}
              </p>
            )}
            {errors.serverError && (
              <p className="text-[20px] text-red mt-2">
                {errors.serverError.message}
              </p>
            )}
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
                  to="/signUp"
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
