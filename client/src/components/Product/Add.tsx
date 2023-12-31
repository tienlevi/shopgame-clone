import { useState, useEffect, createContext } from "react";

interface ProductId {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

interface addToCart extends ProductId {
  items: [];
  onAddToCart: (prev: any) => void;
}

export const CartContext = createContext<addToCart>({
  items: [],
  onAddToCart: () => {},
});

function App() {
  const [cart, setCart] = useState([]);
  const [pingCart, setPingCart] = useState(0);

  useEffect(() => {
    let storedCart = localStorage.getItem("ProductName");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  //   const addToCart = () => {
  //     const update: ProductId = {
  //       id: thisProduct?.id,
  //       name: thisProduct?.name,
  //       img: thisProduct?.img,
  //       price: thisProduct?.price,
  //       origin: thisProduct?.origin,
  //     };
  //     let updatedCart = [...cart];
  //     let itemInCart = updatedCart.find((item) => item.id === product.id);
  //     if (itemInCart) {
  //       itemInCart.quantity += 1;
  //     } else {
  //       updatedCart.push({ ...product, quantity: 1 });
  //     }
  //     setCart(updatedCart);
  //     localStorage.setItem("ProductName", JSON.stringify(updatedCart));
  //   };

  return (
    <>
      {/* <CartContext.Provider value={{ cart, addToCart }}>
      <Header pingCart={pingCart} />
      <Container />
    </CartContext.Provider> */}
    </>
  );
}

export default App;
