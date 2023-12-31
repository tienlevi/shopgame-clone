import { useContext } from "react";
import { CartContext } from "../components/Cart/CartProvider";

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export default useCart;
