import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Pages/Main";
import Profile from "../Pages/Profile";
import About from "../Pages/About";
import ProtectedRoute from "./comp/ProtectedRoute";
import PublicRoute from "./comp/PublicRoute";
import { AuthContext } from "../Store";
import { RegisterPushNotification } from "../pushNotification";
import { setLocalStorageData } from "../utils/helper";
import Auth from "../Pages/Auth";
import { getAuth } from "firebase/auth";

const Navigation = () => {
  const context = React.useContext(AuthContext);
  const { setUid, setTheme, setCheckedNotification } = context;

  React.useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("mycapacitorapptheme")!);
    const loginData = JSON.parse(localStorage.getItem("mycapacitorappLogin")!);
    const notificationService = JSON.parse(
      localStorage.getItem("mycapacitorappnotification")!
    );
    setTheme(mode?.theme ?? "light");
    setUid(loginData?.uid ?? "");
    if (notificationService?.isNotificationEnabled) {
      requestNotificationPermission();
    }
  }, []);

  const requestNotificationPermission = async () => {
    RegisterPushNotification().then((res) => {
      if (res === true) {
        setLocalStorageData("mycapacitorappnotification", {
          isNotificationEnabled: true,
        });
        setCheckedNotification(true);
      } else {
        localStorage.removeItem("mycapacitorappnotification");
        setCheckedNotification(false);
      }
    });
  };

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
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
