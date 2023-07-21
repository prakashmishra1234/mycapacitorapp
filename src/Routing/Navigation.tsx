import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Pages/Main";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import About from "../Pages/About";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
