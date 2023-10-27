import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductItems from "../../Items/ProductItems";
import ToggleCart from "./Toggle/ToggleCart";
import ToastSuccess from "./Toast/ToastSuccess";
import ToastRemove from "./Toast/ToastRemove";

interface Cart {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

interface Toasts {
  id: number;
}

function ProductName() {
  const [childrenToast, setChildrenToast] = useState<Toasts[]>([]);
  const [toast, setToast] = useState<boolean>(false);
  const { id } = useParams<string>();
  const num = Number(id);
  const thisProduct = ProductItems.find((item) => item.id === num);
  const [cart, setCart] = useState<Cart[]>([]);
  const added = cart.find((item) => item.id === num);

  useEffect(() => {
    const saved = localStorage.getItem("ProductName");
    if (saved) {
      setCart(JSON.parse(saved) || []);
    }
  }, []);

  const handleButton = useCallback(() => {
    setChildrenToast((prev: any) => {
      const addToast: Toasts = {
        id: prev.length,
      };
      setChildrenToast([...childrenToast, addToast]);
      return childrenToast;
    });
    setTimeout(() => {
      setChildrenToast((items: any) => items.filter((item: any) => item.id));
    }, 5000);
    if (added) {
      return false;
    } else {
      return true;
    }
  }, [added, childrenToast]);

  const closeToast = (index: number) => {
    const dismissToast = childrenToast.filter((item) => item.id !== index);
    setChildrenToast(dismissToast);
  };

  return (
    <>
      <div className="fixed top-[10%] right-[5%] z-30">
        {childrenToast.map((item, index) =>
          added ? (
            <ToastRemove
              key={index}
              activeToast={!toast}
              onClose={() => closeToast(item.id)}
            />
          ) : (
            <ToastSuccess
              key={index}
              activeToast={!toast}
              onClose={() => closeToast(item.id)}
            />
          )
        )}
      </div>
      <div className="max-w-[1200px] mx-auto mt-[150px] xl:w-[1000px] lg:w-[720px] md:w-[500px]">
        <div className="flex md:flex-col">
          <img
            className="w-[250px] h-[350px] object-cover md:w-[100%] md:h-[650px]"
            src={thisProduct?.img}
            alt=""
          />
          <div className="ml-4 md:ml-0">
            <h1 className="text-[25px] font-bold md:text-[32px]">
              {thisProduct?.name}
            </h1>
            <p className="text-[18px] my-2 text-red font-bold md:text-[24px]">
              {thisProduct?.price}$
            </p>
            <p className="text-[18px] my-2 md:text-[24px]">
              Status: <span className="text-green">Stoking</span>
            </p>
            <p className="text-[18px] my-2 md:text-[24px]">
              {thisProduct?.origin}
            </p>
            <div className="flex md:flex-col md:items-center">
              <button className="flex items-center justify-center w-[150px] h-[40px] text-[20px] text-white bg-bluesecond rounded-[5px] cursor-pointer md:w-[100%] md:h-[50px] md:text-[27px]">
                Buy
              </button>

              <div onClick={handleButton}>
                <ToggleCart
                  id={thisProduct?.id}
                  name={thisProduct?.name}
                  img={thisProduct?.img}
                  price={thisProduct?.price}
                  origin={thisProduct?.origin}
                  activeCart={true || false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductName;
