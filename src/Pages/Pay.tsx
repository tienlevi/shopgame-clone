import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useCart from "../hooks/useCart";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

interface myCart {
  id: number;
  name: string;
  img: string;
  price: number;
  category: string;
}

function Pay() {
  const methodPay = [
    { id: 1, name: "PayPal" },
    { id: 2, name: "Payment on delivery" },
  ];
  const { cart }: any = useCart();
  const [cartItems, setCartItems] = useState<myCart[]>([]);
  const [checked, setChecked] = useState<number>(1);

  useEffect(() => {
    const value = localStorage.getItem("CartItems");
    value && setCartItems(JSON.parse(value));
  }, []);

  return (
    <Title title="Pay">
      <Header />
      <h1 className="font-bold text-[27px] text-center mt-[130px]">Payment</h1>
      <div className="max-w-[1200px] mt-5 mx-auto">
        <div className="flex">
          <div className="w-[60%] h-[50%] px-3 bg-lightBlue rounded-md shadow-[0_0_4px_0.5px_rgba(0,0,0,0.3)]">
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="text-[19px] text-white">
                Username
              </label>
              <input
                type="text"
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
                    <h1>{item.name}</h1>
                    <p>{cart?.length}</p>
                  </div>
                </div>
                <div className="font-bold">{item.price}$</div>
              </div>
            ))}
            <Button sx={{ width: "100%" }} color="primary" variant="contained">
              Buy
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </Title>
  );
}

export default Pay;
