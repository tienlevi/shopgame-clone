import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

interface removeId {
  id: number;
  remove: (index: number) => void;
}

function RemoveCart({ id, remove }: removeId) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        onClick={() => remove(id)}
        sx={{
          width: { xl: "170px", lg: "170px", md: "120px", sm: "120px" },
        }}
        color="error"
      >
        Remove
      </Button>
    </ThemeProvider>
  );
}

export default RemoveCart;
