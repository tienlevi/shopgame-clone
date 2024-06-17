import { useState, useEffect, useMemo, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme/theme";
import RemoveCart from "./RemoveCart";
import Images from "../../utils/Images";
import { CartContext } from "../../context/CartProvider";
import useUser from "../../hooks/useUser";

interface myCart {
  id: number;
  name: string;
  img: string;
  price: number;
  category: string;
  quantity: number;
}

function MyCart() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [cart, setCart] = useState<myCart[]>([]);
  const { removeCart } = useContext(CartContext);

  useEffect(() => {
    const value = localStorage.getItem("CartItems");
    value && setCart(JSON.parse(value));
  }, []);

  const Remove = (itemId: number) => {
    toast.error("Remove success");
    setCart((items) => {
      const remove = items.filter((item) => item.id !== itemId);
      localStorage.setItem("CartItems", JSON.stringify(remove));
      return remove;
    });
    removeCart(itemId);
  };

  // const saveToLocalStorage = (products: any) => {
  //   localStorage.setItem("CartItems", JSON.stringify(products));
  // };

  // const increaseQuantity = (Product: number) => {
  //   const updatedProducts = cart.map((product) => {
  //     if (product.id === Product) {
  //       return { ...product, quantity: product.quantity + 1 };
  //     }
  //     return product;
  //   });

  //   setCart(updatedProducts);
  //   saveToLocalStorage(updatedProducts);
  // };

  // const decreaseQuantity = (Product: number) => {
  //   const updatedProducts = cart.map((product) => {
  //     if (product.id === Product && product.quantity > 1) {
  //       return { ...product, quantity: product.quantity - 1 };
  //     }
  //     return product;
  //   });

  //   setCart(updatedProducts);
  //   saveToLocalStorage(updatedProducts);
  // };

  const total = useMemo(() => {
    return cart.reduce((cash: number, item) => cash + item.price, 0);
  }, [cart]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        theme="colored"
        pauseOnHover={false}
        style={{ width: "300px", height: "50px" }}
      />
      <div className="max-w-[1200px] mt-[130px] mx-auto xl:w-[1000px] lg:w-[720px] md:w-[500px] sm:w-[350px] xs:w-[200px]">
        <h1 className="text-[29px] font-bold">My cart</h1>
        <div className="flex my-[20px] lg:flex lg:flex-col">
          <div className="w-[70%] lg:w-[100%] sm:px-1">
            {cart &&
              cart.map((item, index) => (
                <div
                  className="flex justify-between mb-4 md:flex-col"
                  key={index}
                >
                  <div className="flex xs:flex-col xs:w-[200px]">
                    <div className="block">
                      <img
                        className="w-[250px] h-[350px] object-cover md:w-[200px] md:h-[250px]"
                        src={Images(item.img)}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col ml-4 w-[400px] break-words lg:flex-col sm:w-[300px] xs:ml-0 xs:w-[200px]">
                      <div className="">
                        <h2 className="text-[27px] font-bold md:text-[20px]">
                          {item.name}
                        </h2>
                        <p className="mt-3 text-[18px]">{item.category}</p>
                        <b className="mt-3 text-[21px] text-red font-bold text-right">
                          {item.price}$
                        </b>
                      </div>
                      {/* <div className="flex my-3">
                        <p
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex items-center justify-center w-[30px] h-[30px] text-[20px] border-black border-[1px] cursor-pointer"
                        >
                          -
                        </p>
                        <p className="text-center w-[30px] border-black border-[1px]">
                          {item.quantity}
                        </p>
                        <p
                          onClick={() => increaseQuantity(item.id)}
                          className="flex items-center justify-center w-[30px] h-[30px] text-[20px] border-black border-[1px] cursor-pointer"
                        >
                          +
                        </p>
                      </div> */}
                      <div className="mt-3">
                        <RemoveCart id={item.id} remove={Remove} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {cart.length <= 0 && (
              <h1 className="text-[29px] font-bold">No Product here</h1>
            )}
          </div>
          <div className="w-[30%] pl-4 lg:w-[100%] lg:pl-0">
            <div className="flex justify-between">
              <div>
                <h2 className="text-[23px] font-bold mb-2 md:text-[20px]">
                  All Products:
                </h2>
                <h2 className="text-[23px] font-bold mb-2 md:text-[20px]">
                  Sale:
                </h2>
                <h2 className="text-[23px] font-bold mb-2 md:text-[20px]">
                  Total:
                </h2>
              </div>
              <div className="text-right">
                <h2 className="text-[23px] font-bold mb-2 md:text-[20px]">
                  {total}$
                </h2>
                <h2 className="text-[23px] font-bold mb-2 md:text-[20px]">
                  0$
                </h2>
                <h2 className="text-[23px] font-bold mb-2 md:text-[20px]">
                  {total}$
                </h2>
              </div>
            </div>
            <Button
              sx={{
                width: "100%",
              }}
              color="primary"
              variant="contained"
              onClick={() => {
                if (!user) {
                  toast.warning("You have to login to order");
                } else {
                  navigate("/order");
                }
              }}
            >
              Order
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyCart;
