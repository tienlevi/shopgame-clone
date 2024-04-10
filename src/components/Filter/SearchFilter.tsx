import { useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductItems from "../../Items/ProductItems";
import Images from "../../utils/Images";
import AddToCart from "../Cart/AddToCart";
import useCart from "../../hooks/useCart";
import Product from "../../interface";

function SearchFilter() {
  const [product, setProduct] = useState<Product[]>([]);
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const search = param.get("name");
  const filter = useRef<any>([]);
  const { addToCart }: any = useCart();

  filter.current = ProductItems.filter((item: any) =>
    item.name.toLowerCase().includes(search?.toLowerCase())
  );

  const handleAddToCart = useCallback(
    (pro: Product) => {
      const update: Product = {
        id: pro.id,
        name: pro.name,
        img: pro.img,
        price: pro.price,
        category: pro.category,
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
      <div className="max-w-[1250px] mx-auto mt-[130px] px-[15px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[520px] sm:max-w-[250px]">
        <h1 className="text-[30px] font-bold ml-[8px]">Search: {search}</h1>
        <div className="flex flex-wrap">
          {filter &&
            filter.current.map((product: any, index: number) => (
              <div key={index} className="mx-[12px] my-[10px]">
                <Link key={index} to={`/product-detail/${product.id}`}>
                  <img
                    src={Images(product.img)}
                    className="w-[220px] h-[350px] object-cover"
                    alt=""
                  />
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
                    <h2 className="text-[20px] font-bold hover:underline">
                      {product.name}
                    </h2>
                    <p className="text-red font-bold">{product.price}$</p>
                  </div>
                </Link>
              </div>
            ))}
          {filter.current.length <= 0 && <h1>No product found</h1>}
        </div>
      </div>
    </>
  );
}

export default SearchFilter;
