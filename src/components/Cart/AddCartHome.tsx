import { FaCartPlus } from "react-icons/fa";

interface ProductId {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

interface addToCart extends ProductId {
  onAddToCart: (prev: any) => void;
}

function AddCartHome({ id, name, img, price, origin, onAddToCart }: addToCart) {
  const handleAddProduct = () => {
    const update: ProductId = {
      id: id,
      name: name,
      img: img,
      price: price,
      origin: origin,
    };
    onAddToCart(update);
  };

  return (
    <div className="flex items-center justify-center bg-white my-2 w-[45px] h-[45px] rounded-[45px] text-black duration-300 cursor-pointer hover:bg-black hover:text-white">
      <FaCartPlus onClick={handleAddProduct} className="text-[22px]" />
    </div>
  );
}

export default AddCartHome;
