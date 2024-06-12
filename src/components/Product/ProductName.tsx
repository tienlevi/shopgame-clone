import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { Stack, Button, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "../theme/theme";
import ProductItems from "../../Items/ProductItems";
import AddToCart from "../Cart/AddToCart";
import Images from "../../utils/Images";
import Product from "../../interface";
import { CartContext } from "../../context/CartProvider";

function ProductName() {
  const { id } = useParams<string>();
  const num = Number(id);
  const thisProduct = ProductItems.find((item) => item.id === num);
  const [product, setProduct] = useState<Product[]>([]);
  const [isCartAdded, setIsCartAdded] = useState<boolean>(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const saved = localStorage.getItem("CartItems");
    saved && setProduct(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const existProduct = product.find((item) => item.id === thisProduct?.id);
    existProduct && setIsCartAdded(true);
  }, [product, thisProduct?.id]);

  const handleAddToCart = useCallback(() => {
    const update: Product = {
      id: thisProduct?.id,
      name: thisProduct?.name,
      img: thisProduct?.img,
      price: thisProduct?.price,
      category: thisProduct?.category,
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
    addToCart,
    thisProduct?.id,
    thisProduct?.img,
    thisProduct?.name,
    thisProduct?.category,
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
              src={Images(thisProduct?.img)}
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
                {thisProduct?.category}
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
                <ThemeProvider theme={theme}></ThemeProvider>
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
                  <AddToCart
                    id={thisProduct?.id}
                    name={thisProduct?.name}
                    img={thisProduct?.img}
                    price={thisProduct?.price}
                    category={thisProduct?.category}
                    onAddToCart={handleAddToCart}
                  >
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
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                    >
                      Add To Cart
                    </Button>
                  </AddToCart>
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
