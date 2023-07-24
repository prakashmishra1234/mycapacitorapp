import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Pages/Main";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import About from "../Pages/About";
import ProtectedRoute from "./comp/ProtectedRoute";
import PublicRoute from "./comp/PublicRoute";

const Navigation = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
