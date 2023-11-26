import { useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import ProductItems from "../../Items/ProductItems";
import AddCart from "./AddCart";

function ProductName() {
  const [toast, setToast] = useState<boolean>(false);
  const { id } = useParams<string>();
  const num = Number(id);
  const thisProduct = ProductItems.find((item) => item.id === num);

  const handleButton = () => {
    setToast(true);
  };

  return (
    <>
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
                <div onClick={handleButton}>
                  <AddCart
                    id={thisProduct?.id}
                    name={thisProduct?.name}
                    img={thisProduct?.img}
                    price={thisProduct?.price}
                    origin={thisProduct?.origin}
                    active={!toast}
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
