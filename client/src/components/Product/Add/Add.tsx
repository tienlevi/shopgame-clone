import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import makeStyles from "@mui/material";

interface addCart {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
  activeCart?: boolean;
}

function AddCart({ id, name, img, price, origin }: addCart) {
  const [product, setProduct] = useState<addCart[]>([]);
  const [isCartAdded, setIsCartAdded] = useState<boolean>(false);
  const added = product.find((item) => item.id === id);

  useEffect(() => {
    const saved = localStorage.getItem("ProductName");
    saved && setProduct(JSON.parse(saved));
  }, []);

  const update: addCart = {
    id: id,
    name: name,
    img: img,
    price: price,
    origin: origin,
  };
  useEffect(() => {
    added && setIsCartAdded(true);
  }, [added]);

  const handleAddProduct = () => {
    if (added) return;
    setProduct((prev: any) => {
      const list = [...prev, update];
      localStorage.setItem("ProductName", JSON.stringify(list));
      setIsCartAdded(true);
      return list;
    });
  };

  return (
    <>
      {isCartAdded ? (
        <button className="flex items-center justify-center w-[220px] h-[40px] ml-4 text-[20px] border-2 border-bluesecond text-blue bg-white rounded-[5px] cursor-pointer md:w-[100%] md:h-[50px] md:my-5 md:ml-0 md:text-[27px]">
          You added this product
        </button>
      ) : (
        <button
          onClick={handleAddProduct}
          className="flex items-center justify-center w-[220px] h-[40px] ml-4 text-[20px] border-2 border-bluesecond text-blue bg-white rounded-[5px] cursor-pointer md:w-[100%] md:h-[50px] md:my-5 md:ml-0 md:text-[27px]"
        >
          Add to cart
        </button>
      )}
    </>
  );
}

export default AddCart;
