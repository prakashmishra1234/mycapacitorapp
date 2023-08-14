import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Store";
import { setLocalStorageData } from "../utils/helper";

const Header = () => {
  const context = React.useContext(AuthContext);
  const { uid, setUid } = context;

  const onclickLogout = (value: boolean) => {
    if (value === false) {
      localStorage.removeItem("mycapacitorappLogin");
      setUid("");
    }
  };

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
        {uid ? (
          <Typography
            sx={{ margin: "0 1rem", cursor: "pointer" }}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => onclickLogout(false)}
          >
            Logout
          </Typography>
        ) : (
          <Typography sx={{ margin: "0 1rem" }}>
            <Link
              to="/auth"
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
