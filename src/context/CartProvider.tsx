import { useState, useEffect, createContext } from "react";

interface ProductId {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

interface CartItem extends ProductId {
  cart: ProductId[];
  addToCart: (prev: any) => void;
  removeCart: (itemId: number) => void;
}

export const CartContext = createContext<CartItem | null>(null);

function CartProvider({ children }: any) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("CartItems");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (pro: CartItem) => {
    const existProduct = cart.find((item) => item.id === pro.id);
    if (existProduct) {
      return false;
    }
    setCart([...cart, pro]);
    localStorage.setItem("CartItems", JSON.stringify(cart));
  };

  const removeCart = (itemId: number) => {
    const remove = cart.filter((item) => item.id !== itemId);
    setCart(remove);
  };

  return (
    <CartContext.Provider
      value={{ cart: cart as ProductId[], addToCart, removeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
