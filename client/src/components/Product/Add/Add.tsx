import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../../theme/color";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
      <ThemeProvider theme={theme}>
        {isCartAdded ? (
          <Button variant="outlined">You added this product</Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleAddProduct}
            sx={{ width: 220, bgcolor: "" }}
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
