import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export default useCart;
