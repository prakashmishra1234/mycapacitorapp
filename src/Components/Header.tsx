import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Store";

const Header = () => {
  const context = React.useContext(AuthContext);
  const { login } = context;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ margin: "0 1rem" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Typography>
        <Typography sx={{ margin: "0 1rem" }}>
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            About
          </Link>
        </Typography>
        <Typography sx={{ margin: "0 1rem" }}>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Profile
          </Link>
        </Typography>
        {login ? (
          <Typography
            sx={{ margin: "0 1rem", cursor: "pointer" }}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => {
              localStorage.setItem(
                "mycapacitorappLogin",
                JSON.stringify({ isLoggedIn: false })
              );
              context.setLogin(false);
            }}
          >
            Logout
          </Typography>
        ) : (
          <Typography
            sx={{ margin: "0 1rem" }}
            onClick={() => {
              localStorage.setItem(
                "mycapacitorappLogin",
                JSON.stringify({ isLoggedIn: true })
              );
              context.setLogin(true);
            }}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Header;
