import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b3a37",
      dark: "#3b3a37",
      light: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // background: "inherit",
          // color: "inherit",
          // borderRight: "1px solid grey",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#fff",
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#0af211",
          },
        },
        track: {
          opacity: 0.2,
          backgroundColor: "#71b073",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: "#71b073",
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
