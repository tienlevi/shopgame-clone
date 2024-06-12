import { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import useInterceptors from "../hooks/useInterceptors";
import { ApiUrl } from "../constants";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";

interface myCart {
  id: number;
  name: string;
  img: string;
  price: number;
  category: string;
}

function Pay() {
  const { register, handleSubmit, reset } = useForm();
  const methodPay = [
    { id: 1, name: "PayPal" },
    { id: 2, name: "Payment on delivery" },
  ];
  const [cartItems, setCartItems] = useState<myCart[]>([]);
  const [checked, setChecked] = useState<number>(1);
  const api = useInterceptors();
  const navigate = useNavigate();
  const { accessToken, user }: any = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const getUser = async (token: any) => {
    try {
      const response = await api.get(`${ApiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      reset(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const value = localStorage.getItem("CartItems");
    value && setCartItems(JSON.parse(value));
  }, []);

  const total = useMemo(() => {
    return cart.reduce((cash: number, item: any) => cash + item.price, 0);
  }, [cart]);

  const onSubmit = async (data: object) => {
    try {
      const response = await axios.post(`${ApiUrl}/api/orders`, {
        userId: user?._id,
        items: cart.map(({ id, ...rest }: any) => ({ ...rest })),
        userInfo: data,
        totalPrice: total,
      });
      toast.success("Order success");
      localStorage.removeItem("CartItems");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Title title="Pay">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        theme="colored"
        pauseOnHover={false}
        style={{ width: "300px", height: "50px" }}
      />
      <h1 className="font-bold text-[27px] text-center mt-[130px]">Order</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1200px] mt-5 mx-auto"
      >
        <div className="flex">
          <div className="w-[60%] h-[50%] px-3 bg-lightBlue rounded-md shadow-[0_0_4px_0.5px_rgba(0,0,0,0.3)]">
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="text-[19px] text-white">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                style={{ background: "transparent" }}
                className="w-[100%] h-[35px] text-[18px] border-b-[1px] text-white border-white mt-2 pl-3 focus:outline-none placeholder:text-gray"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="text-[19px] text-white">
                Email
              </label>
              <input
                type="text"
                {...register("email")}
                style={{ background: "transparent" }}
                className="w-[100%] h-[35px] text-[18px] border-b-[1px] text-white border-white mt-2 pl-3 focus:outline-none placeholder:text-gray"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="text-[19px] text-white">
                Phone number
              </label>
              <input
                type="text"
                {...register("tel")}
                style={{ background: "transparent" }}
                className="w-[100%] h-[35px] text-[18px] border-b-[1px] text-white border-white mt-2 pl-3 focus:outline-none placeholder:text-gray"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="text-[19px] text-white">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                style={{ background: "transparent" }}
                className="w-[100%] h-[35px] text-[18px] border-b-[1px] text-white border-white mt-2 pl-3 focus:outline-none placeholder:text-gray"
              />
            </div>
            <div className="my-2">
              {methodPay.map((method, index) => (
                <div className="my-2" key={index}>
                  <input
                    type="radio"
                    checked={checked === method?.id}
                    onChange={() => setChecked(method?.id)}
                  />
                  <label htmlFor="" className="text-white">
                    {method.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="text-[19px] text-white">
                Note
              </label>
              <textarea
                className="w-[100%] h-[100px] mt-2 resize-none focus:outline-none"
                name=""
                id=""
              ></textarea>
            </div>
          </div>
          <div className="w-[40%] h-[100%] ml-4 p-2 border-[1px] border-F7F7F7 rounded-md shadow-[0_0_4px_0.5px_rgba(0,0,0,0.3)]">
            <h1 className="text-[23px] font-bold">Items order</h1>
            {cartItems.map((item, index) => (
              <div className="flex justify-between my-3" key={index}>
                <div className="flex">
                  <img
                    src={item.img}
                    alt=""
                    className="w-[120px] h-[150px] object-cover"
                  />
                  <div className="ml-2 w-[50%]">
                    <p className="text-[20px] font-medium">{item.name}</p>
                    <p className="text-[17px]">{item.category}</p>
                  </div>
                </div>
                <div className="font-bold">{item.price}$</div>
              </div>
            ))}
            <Button
              sx={{ width: "100%" }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Buy
            </Button>
          </div>
        </div>
      </form>
      <Footer />
    </Title>
  );
}

export default Pay;
