import React from "react";
import "./App.css";
import Navigation from "./Routing/Navigation";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./Store";
import { firebaseConfig } from "./FirebaseConfig";
import { initializeApp } from "firebase/app";
import { Toaster } from "react-hot-toast";

function App() {
  initializeApp(firebaseConfig);
  return (
    <Store>
      <BrowserRouter>
        <Toaster />
        <Navigation />
      </BrowserRouter>
    </Store>
  );
}

export default App;
