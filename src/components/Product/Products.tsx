import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductItems from "../../Items/ProductItems";
import AddToCart from "../Cart/AddToCart";
import useCart from "../../hooks/useCart";
import Images from "../../utils/Images";

interface Product {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  category?: string;
  quantity?: number;
}

function Products() {
  const [product, setProduct] = useState<Product[]>([]);
  const { addToCart }: any = useCart();

  useEffect(() => {
    const saved = localStorage.getItem("CartItems");
    saved && setProduct(JSON.parse(saved));
  }, []);

  const handleAddToCart = useCallback(
    (pro: Product) => {
      const update: Product = {
        id: pro.id,
        name: pro.name,
        img: pro.img,
        price: pro.price,
        category: pro.category,
        quantity: 1,
      };
      addToCart(update);
      const existProduct = product.find((item) => item.id === pro.id);
      if (existProduct) {
        toast.warning("You added this product");
        return false;
      } else {
        setProduct((prev: any) => {
          const list = [...prev, pro];
          localStorage.setItem("CartItems", JSON.stringify(list));
          return list;
        });
        toast.success("Add success");
      }
    },
    [addToCart, product]
  );

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
      <div className="max-w-[1250px] mx-auto mt-[20px] px-[15px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[520px] sm:max-w-[250px] sm:text-center">
        <h1 className="text-[30px] font-bold px-[8px] sm:ml-0">All games</h1>
        <div className="flex flex-wrap relative">
          {ProductItems.map((product: any, index: number) => (
            <div
              key={index}
              className="mx-[12px] my-[10px] relative z-3 group sm:mx-0"
            >
              <Link
                key={index}
                to={`./product-detail/${product.id}`}
                className="relative"
              >
                <img
                  src={Images(product?.img)}
                  className="w-[220px] h-[350px] object-cover relative"
                  alt=""
                />
              </Link>
              <div className="absolute top-2 right-0 opacity-0 duration-150 z-5 group-hover:opacity-100 group-hover:right-2">
                <AddToCart
                  id={product.id}
                  name={product.name}
                  img={product.img}
                  price={product.price}
                  category={product.category}
                  onAddToCart={handleAddToCart}
                  className="flex items-center justify-center bg-white my-2 w-[45px] h-[45px] rounded-[45px] text-black duration-300 cursor-pointer hover:bg-black hover:text-white"
                >
                  <FaCartPlus className="text-[22px]" />
                </AddToCart>
              </div>
              <div className="w-[220px]">
                <h2 className="text-[20px] font-bold">{product.name}</h2>
                <p className="text-red font-bold">{product.price}$</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
