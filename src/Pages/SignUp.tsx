import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import Title from "../components/Title/Title";
import { ApiUrl } from "../constants";

interface Input {
  name: string;
  email: string;
  password: string;
  tel: string;
  serverError?: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<Input>({
    defaultValues: { name: "", email: "", password: "", tel: "" },
  });
  const formValue = watch();
  const { name, email, password, tel } = formValue;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("AccessToken");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (accessToken) {
      navigate("/Profile");
    }
  }, [accessToken, navigate]);

  const onSubmit = async () => {
    try {
      const response = await axios.post(`${ApiUrl}/api/signup`, {
        name,
        password,
        email,
        tel,
      });
      const refreshToken = response.data?.refreshToken;
      console.log(response);
      console.log(refreshToken);
    } catch (err: any) {
      if (err.response?.status === 402) {
        setError("password", {
          type: "402",
          message: "User already registered.",
        });
      }
      if (err.response?.status === 400) {
        setError("password", {
          type: "402",
          message: "Password must be at least 6 characters long",
        });
      }
    }
  };

  return (
    <Title title="Register">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-bluesecond">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] py-5 mt-[50px] bg-white rounded-[5px]"
        >
          <Link to="/">
            <FaArrowLeft className="text-[23px] m-4 cursor-pointer" />
          </Link>
          <h1 className="text-center text-3xl font-bold mt-[-24px]">Sign Up</h1>
          <div className="w-[280px] mx-auto">
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-[20px] text-red mt-2">name is required</p>
            )}
            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="text"
              placeholder="email"
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
              <p className="text-[20px] text-red mt-2">password is required</p>
            )}

            <input
              className="w-[280px] h-[35px] text-[18px] border-[1px] border-black mt-4 pl-3 rounded-[20px] focus:outline-none"
              type="text"
              placeholder="tel"
              {...register("tel", { required: true })}
            />
            {errors.tel?.type === "required" && (
              <p className="text-[20px] text-red mt-2">tel is required</p>
            )}
            {errors.serverError && (
              <p className="text-[20px] text-red mt-2">
                {errors.serverError.message}
              </p>
            )}
            {errors.password && (
              <p className="text-[20px] text-red mt-2">
                {errors.password.message}
              </p>
            )}
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
