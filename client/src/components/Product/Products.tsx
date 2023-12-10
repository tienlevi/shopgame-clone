import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ProductItems from "../../Items/ProductItems";
import AddCartHome from "./AddCartHome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductId {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

function Products() {
  const [product, setProduct] = useState<ProductId[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ProductName");
    saved && setProduct(JSON.parse(saved));
  }, []);

  const handleAddToCart = useCallback(
    (pro: ProductId) => {
      const existProduct = product.find((item) => item.id === pro.id);
      if (existProduct) {
        toast.warning("You added this product");
        return false;
      } else {
        setProduct((prev: any) => {
          const list = [...prev, pro];
          localStorage.setItem("ProductName", JSON.stringify(list));
          return list;
        });
        toast.success("Add success");
      }
    },
    [product]
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
                to={`./ProductDetail/${product.id}`}
                className="relative"
              >
                <img
                  src={product.img}
                  className="w-[220px] h-[350px] object-cover relative"
                  alt=""
                />
              </Link>
              <div className="absolute top-2 right-0 opacity-0 duration-150 z-5 group-hover:opacity-100 group-hover:right-2">
                <AddCartHome
                  id={product.id}
                  name={product.name}
                  img={product.img}
                  price={product.price}
                  origin={product.origin}
                  onAddToCart={handleAddToCart}
                />
                <div className="flex items-center justify-center bg-white my-2 w-[45px] h-[45px] rounded-[45px] text-black duration-300 hover:bg-black hover:text-white">
                  <FaSearch className="text-[22px]" />
                </div>
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
