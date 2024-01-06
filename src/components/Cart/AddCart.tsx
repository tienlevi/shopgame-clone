import { memo } from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

function AddCart({ id, name, img, price, origin, onAddToCart }: addToCart) {
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default memo(AddCart);
