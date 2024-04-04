import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Images from "../../utils/Images";
import AddToCart from "../Cart/AddToCart";
import Product from "../../interface";

interface FilterCategory {
  items: any;
  selectCategory: any;
  onSelectCategory: (name: string) => void;
}

const categories = [
  {
    name: "All",
    origin: "",
  },
  {
    name: "EA Games",
    origin: "EA Games",
  },
  { name: "Game Steam", origin: "Game Steam" },
];

function Filter({ items, selectCategory, onSelectCategory }: FilterCategory) {
  const [product, setProduct] = useState<Product[]>([]);

  const filteredItems = selectCategory
    ? items.filter((item: any) => item.origin === selectCategory)
    : items;

  useEffect(() => {
    const saved = localStorage.getItem("CartItems");
    saved && setProduct(JSON.parse(saved));
  }, []);

  const handleAddToCart = useCallback(
    (pro: Product) => {
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
      <div className="max-w-[1250px] mx-auto mt-[130px] px-[15px] xl:max-w-[1010px] lg:max-w-[765px] md:max-w-[520px] sm:max-w-[250px]">
        <h1 className="text-[30px] font-bold ml-[8px] mb-3">Category</h1>
        <div className="my-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${
                selectCategory === category.origin
                  ? "bg-bluethird text-white"
                  : "text-bluethird"
              } border-[1px] border-bluethird mx-[10px] p-2 rounded-[5px] hover:bg-bluethird hover:text-white duration-100`}
              onClick={() => onSelectCategory(category.origin)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap">
          {filteredItems.map((product: any, index: number) => (
            <div
              key={index}
              className="mx-[12px] my-[10px] relative z-3 group sm:mx-0"
            >
              <Link
                key={index}
                to={`/product-detail/${product.id}`}
                className="relative"
              >
                <img
                  src={Images(product.img)}
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
                  origin={product.origin}
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

export default Filter;
