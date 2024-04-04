import Product from "../../interface";

interface addToCart extends Product {
  onAddToCart: (prev: any) => void;
  children?: any;
  className?: string;
}

function AddToCart(prop: addToCart) {
  const handleAddProduct = () => {
    const update: Product = {
      id: prop.id,
      name: prop.name,
      img: prop.img,
      price: prop.price,
      origin: prop.origin,
    };
    prop.onAddToCart(update);
  };

  return (
    <div className={prop.className} onClick={handleAddProduct}>
      {prop.children}
    </div>
  );
}

export default AddToCart;
