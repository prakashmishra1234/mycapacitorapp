import React from "react";
import "./App.css";
import Navigation from "./Routing/Navigation";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./Store";

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Store>
  );
}

export default App;
