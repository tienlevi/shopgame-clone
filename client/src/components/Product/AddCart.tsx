import { useState, useEffect, useCallback } from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface addCart {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  origin?: string;
  active?: boolean;
}

function AddCart({ id, name, img, price, origin, active }: addCart) {
  const [product, setProduct] = useState<addCart[]>([]);
  const [isCartAdded, setIsCartAdded] = useState<boolean>(false);
  const added = product.find((item) => item.id === id);

  useEffect(() => {
    const saved = localStorage.getItem("ProductName");
    saved && setProduct(JSON.parse(saved));
  }, []);

  useEffect(() => {
    added && setIsCartAdded(true);
  }, [added]);

  const handleAddProduct = useCallback(() => {
    const update: addCart = {
      id: id,
      name: name,
      img: img,
      price: price,
      origin: origin,
      active: active,
    };
    setProduct((prev: any) => {
      const list = [...prev, update];
      localStorage.setItem("ProductName", JSON.stringify(list));
      setIsCartAdded(true);
      return list;
    });
  }, [id, img, name, origin, price]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {isCartAdded ? (
          <Button
            variant="outlined"
            sx={{
              width: { xl: "250px", lg: "250px", md: "250px", sm: "100%" },
            }}
          >
            You added this product
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleAddProduct}
            sx={{
              width: { xl: "250px", lg: "250px", md: "250px", sm: "100%" },
            }}
            color="primary"
            startIcon={<ShoppingCartIcon />}
          >
            Add to cart
          </Button>
        )}
      </ThemeProvider>
    </>
  );
}

export default AddCart;
