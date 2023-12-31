import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { Stack, Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import ProductItems from "../../Items/ProductItems";
import AddCart from "../Cart/AddCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductId {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
}

function ProductName() {
  const { id } = useParams<string>();
  const num = Number(id);
  const thisProduct = ProductItems.find((item) => item.id === num);
  const [product, setProduct] = useState<ProductId[]>([]);
  const [isCartAdded, setIsCartAdded] = useState<boolean>(false);
  const { addToCart }: any = useCart();

  useEffect(() => {
    const saved = localStorage.getItem("CartItems");
    saved && setProduct(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const existProduct = product.find((item) => item.id === thisProduct?.id);
    existProduct && setIsCartAdded(true);
  }, [product, thisProduct?.id]);

  const handleButton = useCallback(() => {
    const update: ProductId = {
      id: thisProduct?.id,
      name: thisProduct?.name,
      img: thisProduct?.img,
      price: thisProduct?.price,
      origin: thisProduct?.origin,
    };
    addToCart(update);
    setProduct((prev: any) => {
      const list = [...prev, update];
      localStorage.setItem("CartItems", JSON.stringify(list));
      setIsCartAdded(true);
      return list;
    });
    toast.success("Add success");
    return update;
  }, [
    thisProduct?.id,
    thisProduct?.img,
    thisProduct?.name,
    thisProduct?.origin,
    thisProduct?.price,
  ]);

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
      <ThemeProvider theme={theme}>
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
              <Stack
                spacing={4}
                direction={{ xl: "row", lg: "row", md: "row", sm: "column" }}
              >
                <Button
                  sx={{
                    width: {
                      xl: "150px",
                      lg: "150px",
                      md: "150px",
                      sm: "100%",
                    },
                  }}
                  color="primary"
                  variant="contained"
                >
                  Buy
                </Button>
                {isCartAdded ? (
                  <Button
                    variant="outlined"
                    sx={{
                      width: {
                        xl: "250px",
                        lg: "250px",
                        md: "250px",
                        sm: "100%",
                      },
                    }}
                  >
                    You added this product
                  </Button>
                ) : (
                  <AddCart
                    id={thisProduct?.id}
                    name={thisProduct?.name}
                    img={thisProduct?.img}
                    price={thisProduct?.price}
                    origin={thisProduct?.origin}
                    onAddToCart={handleButton}
                  />
                )}
              </Stack>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default ProductName;
