import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d6ffd",
    },
    error: {
      main: "#ff3232",
    },
    success: {
      main: "#01DF01",
    },
  },
  breakpoints: {
    values: {
      xl: 1250,
      lg: 1050,
      md: 780,
      sm: 520,
      xs: 0,
    },
  },
});

export default theme;
