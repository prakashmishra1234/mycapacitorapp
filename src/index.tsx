import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
