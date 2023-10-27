import { useState, useEffect } from "react";

interface addCart {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
  activeCart?: boolean;
}

function AddCart({ id, name, img, price, origin }: addCart) {
  const [product, setToggleProduct] = useState<addCart[]>([]);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const added = product.find((item) => item.id === id);

  useEffect(() => {
    const saved = localStorage.getItem("ProductName");
    saved && setToggleProduct(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (added) {
      setIsCartAdded(true);
    }
  }, [added, product]);

  const handleAddProduct = () => {
    if (added) {
      return false;
    } else {
      const update: addCart = {
        id: id,
        name: name,
        img: img,
        price: price,
        origin: origin,
      };
      const list = [...product, update];
      localStorage.setItem("ProductName", JSON.stringify(list));
    }
    setIsCartAdded(true);
    setToggleProduct(product);
  };

  const handleRemoveProduct = (index: any) => {
    setIsCartAdded(false);
    const remove = product.filter((item) => item.id !== index);
    localStorage.setItem("ProductName", JSON.stringify(remove));
    return remove;
  };

  return (
    <>
      {isCartAdded ? (
        <button
          onClick={() => handleRemoveProduct(id)}
          className="flex items-center justify-center w-[220px] h-[40px] ml-4 text-[20px] border-2 border-bluesecond text-blue bg-white rounded-[5px] cursor-pointer md:w-[100%] md:h-[50px] md:my-5 md:ml-0 md:text-[27px]"
        >
          Remove to cart
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
