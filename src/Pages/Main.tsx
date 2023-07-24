import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { AuthContext, DrawerAnchorEnum } from "../Store";
import { isPlatform } from "@ionic/react";
import { Box, Typography, Avatar, IconButton, Menu } from "@mui/material";
import Header from "../Components/Header";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CustomDrawer from "../Components/Drawer";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Main = () => {
  const context = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(false);
  const { theme, setTheme, setOpenDrawer, setDrawerComp, setdrawerAnchor } =
    context;

  const toggleDrawer = (
    value: boolean,
    comp: string,
    direction: DrawerAnchorEnum
  ) => {
    setOpenDrawer(value);
    setDrawerComp(comp);
    setdrawerAnchor(direction);
  };

  const onThemeChange = (theme: string) => {
    localStorage.setItem(
      "mycapacitorapptheme",
      JSON.stringify({ theme: theme })
    );
    setTheme(theme);
  };

  const onMenuChange = (value: boolean) => {
    setAnchorElUser(value);
  };

  const themebutton = (
    <>
      {theme === "dark" ? (
        <MenuItem
          sx={{ display: "flex" }}
          onClick={() => onThemeChange("light")}
        >
          <WbSunnyOutlinedIcon />
          <Typography sx={{ marginLeft: "1rem" }} textAlign="center">
            {"Enable light mode"}
          </Typography>
        </MenuItem>
      ) : (
        <MenuItem
          sx={{ display: "flex" }}
          onClick={() => onThemeChange("dark")}
        >
          <NightlightOutlinedIcon />
          <Typography sx={{ marginLeft: "1rem" }} textAlign="center">
            {"Enable dark mode"}
          </Typography>
        </MenuItem>
      )}
    </>
  );

  const profile = (
    <Box sx={{ flexGrow: 0, display: { md: "block", xs: "flex" } }}>
      <Tooltip title="click to open">
        <IconButton onClick={() => onMenuChange(true)} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1689324579~exp=1689325179~hmac=6fe260c6e879ea8a25412bcb248295f073e7f127fc680d5c2e853773f3463aa5"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={anchorElUser}
        onClose={() => onMenuChange(false)}
      >
        <MenuItem
          sx={{ display: "flex" }}
          onClick={() => {
            navigate("/profile");
            onMenuChange(false);
          }}
        >
          <AccountCircleOutlinedIcon />
          <Typography textAlign="center" sx={{ marginLeft: "1rem" }}>
            View Profile
          </Typography>
        </MenuItem>
        {themebutton}
      </Menu>
    </Box>
  );

  const Navbar = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 0.5rem",
        height: "7vh",
      }}
    >
      <Box sx={{ display: { md: "none", xs: "flex" } }}>
        <ListOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => toggleDrawer(true, "sidebar", DrawerAnchorEnum.Left)}
        />
      </Box>
      <Typography variant="h6" style={{ fontFamily: "monospace" }}>
        My Application
      </Typography>
      <Box sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}>
        <Header />
        {profile}
      </Box>

      {isPlatform("android") ? (
        <NotificationsNoneOutlinedIcon
          style={{ cursor: "pointer" }}
          onClick={() =>
            toggleDrawer(true, "notification", DrawerAnchorEnum.Right)
          }
        />
      ) : null}
    </Box>
  );

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: theme === "dark" ? "primary.dark" : "primary.main",
          color: theme === "dark" ? "primary.main" : "primary.dark",
        }}
      >
        <CustomDrawer />
        {Navbar}
        <Box
          sx={{
            height: { xs: "93vh" },
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Main;
