import { useState, useEffect, useMemo, useCallback } from "react";
import ToastRemove from "../Product/Toast/ToastRemove";
import RemoveCart from "./RemoveCart";

interface myCart {
  id: number;
  name: string;
  img: string;
  price: number;
  origin: string;
}

interface Toasts {
  id: number;
}

function MyCart() {
  const [cart, setCart] = useState<myCart[]>([]);
  const [toast, setToast] = useState<boolean>(false);
  const [childrenToast, setChildrenToast] = useState<Toasts[]>([]);

  const Remove = useCallback(
    (index: number) => {
      setCart((items) => {
        const remove = items.filter((item) => item.id !== index);
        localStorage.setItem("ProductName", JSON.stringify(remove));
        return remove;
      });
      const spamToast: Toasts = {
        id: index,
      };
      setChildrenToast([...childrenToast, spamToast]);
      setTimeout(() => {
        setChildrenToast((items: any) => items.filter((item: any) => item.id));
      }, 5000);
      setToast(true);
    },
    [childrenToast]
  );

  const closeToast = (index: number) => {
    const dismissToast = childrenToast.filter((item) => item.id !== index);
    setChildrenToast(dismissToast);
  };

  const total = useMemo(() => {
    return cart.reduce((acc: number, cash) => acc + cash.price, 0);
  }, [cart]);

  useEffect(() => {
    const value = localStorage.getItem("ProductName");
    if (value) {
      setCart(JSON.parse(value));
    }
  }, []);

  return (
    <>
      <div className="fixed top-[10%] right-[5%] z-30">
        {childrenToast.map((item: any, index: number) => (
          <ToastRemove
            key={index}
            activeToast={toast}
            onClose={() => closeToast(item.id)}
          />
        ))}
      </div>
      <div className="max-w-[1200px] mt-[130px] mx-auto xl:w-[1000px] lg:w-[720px] md:w-[500px]">
        {cart && <h1 className="text-[29px] font-bold">My cart</h1>}
        {cart &&
          cart.map((item, index) => (
            <div className="flex my-[20px] justify-between" key={index}>
              <div className="flex">
                <img
                  className="w-[250px] h-[350px] object-cover"
                  src={item.img}
                  alt=""
                />
                <div className="ml-[25px]">
                  <h2 className="text-[27px] font-bold">{item.name}</h2>
                  <p className="text-[18px]">{item.origin}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <b className="text-[21px] text-red font-bold text-right">
                  {item.price}$
                </b>
                <RemoveCart id={item.id} remove={Remove} />
              </div>
            </div>
          ))}
        {cart.length <= 0 && (
          <h1 className="text-[29px] font-bold">No Product here</h1>
        )}

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Add sale code"
            className="w-[500px] h-[35px] text-[18px] pl-2 border-[1px] rounded-[10px] focus:outline-none"
          />
        </div>
        <div className="flex justify-between my-2">
          <div>
            <h2 className="text-[23px] font-bold my-2">All Products: </h2>
            <h2 className="text-[23px] font-bold my-2">Sale: </h2>
            <h2 className="text-[23px] font-bold my-2">Total: </h2>
          </div>
          <div className="text-right">
            <h2 className="text-[23px] font-bold my-2">{total}$ </h2>
            <h2 className="text-[23px] font-bold my-2">0$</h2>
            <h2 className="text-[23px] font-bold my-2">{total}$</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;
