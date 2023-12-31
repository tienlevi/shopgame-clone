import { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveCart from "./RemoveCart";
import { Button } from "@mui/material";

interface myCart {
  id: number;
  name: string;
  img: string;
  price: number;
  origin: string;
}

function MyCart() {
  const [cart, setCart] = useState<myCart[]>([]);

  useEffect(() => {
    const value = localStorage.getItem("ProductName");
    value && setCart(JSON.parse(value));
  }, []);

  const Remove = useCallback((index: number) => {
    toast.error("Remove success");
    setCart((items) => {
      const remove = items.filter((item) => item.id !== index);
      localStorage.setItem("ProductName", JSON.stringify(remove));
      return remove;
    });
  }, []);

  const total = useMemo(() => {
    return cart.reduce((acc: number, cash) => acc + cash.price, 0);
  }, [cart]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        theme="colored"
        pauseOnHover={false}
        style={{ width: "300px", height: "50px" }}
      />
      <div className="max-w-[1200px] mt-[130px] mx-auto xl:w-[1000px] lg:w-[720px] md:w-[500px]">
        <h1 className="text-[29px] font-bold">My cart</h1>
        <div className="flex my-[20px]">
          <div className="w-[70%] pr-4">
            {cart &&
              cart.map((item, index) => (
                <div className="flex justify-between mb-4" key={index}>
                  <div className="flex">
                    <img
                      className="w-[250px] h-[350px] object-cover"
                      src={item.img}
                      alt=""
                    />
                    <div className="ml-[25px]">
                      <h2 className="text-[27px] font-bold">{item.name}</h2>
                      <p className="text-[18px]">{item.origin}</p>
                      <b className="text-[21px] text-red font-bold text-right">
                        {item.price}$
                      </b>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <RemoveCart id={item.id} remove={Remove} />
                  </div>
                </div>
              ))}
            {cart.length <= 0 && (
              <h1 className="text-[29px] font-bold">No Product here</h1>
            )}
          </div>
          <div className="w-[30%] flex justify-between pl-4">
            <div>
              <h2 className="text-[23px] font-bold mb-2">All Products: </h2>
              <h2 className="text-[23px] font-bold mb-2">Sale: </h2>
              <h2 className="text-[23px] font-bold mb-2">Total: </h2>
              <Button
                style={{ width: "100%" }}
                color="primary"
                variant="contained"
              >
                Buy
              </Button>
            </div>
            <div className="text-right">
              <h2 className="text-[23px] font-bold mb-2">{total}$ </h2>
              <h2 className="text-[23px] font-bold mb-2">0$</h2>
              <h2 className="text-[23px] font-bold mb-2">{total}$</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;
