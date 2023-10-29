import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Stack, Button, ThemeProvider } from "@mui/material";
import theme from "../theme/color";
import ProductItems from "../../Items/ProductItems";
import ToggleCart from "./Add/Add";
import ToastSuccess from "./Toast/ToastSuccess";

interface Cart {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

function ProductName() {
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
    setToast(true);
    if (added) {
      return false;
    } else {
      return true;
    }
  }, [added]);

  const closeToast = () => {
    setToast(toast);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="fixed top-[10%] right-[5%] z-30">
          {toast && <ToastSuccess activeToast={toast} onClose={closeToast} />}
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
              <Stack spacing={4} direction="row">
                <Button sx={{ width: 150 }} color="primary" variant="contained">
                  Buy
                </Button>
                <div onClick={handleButton}>
                  <ToggleCart
                    id={thisProduct?.id}
                    name={thisProduct?.name}
                    img={thisProduct?.img}
                    price={thisProduct?.price}
                    origin={thisProduct?.origin}
                    activeCart={toast}
                  />
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default ProductName;
