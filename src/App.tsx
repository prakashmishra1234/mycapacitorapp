import React from "react";
import "./App.css";
import Navigation from "./Routing/Navigation";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, Store } from "./Store";
import { PushNotifications } from "@capacitor/push-notifications";
import { RegisterPushNotification } from "./pushNotification";

function App() {
  const context = React.useContext(AuthContext);
  const { setLogin, setTheme, setCheckedNotification } = context;

  React.useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("mycapacitorapptheme")!);
    const login = JSON.parse(localStorage.getItem("mycapacitorappLogin")!);
    const notificationService = JSON.parse(
      localStorage.getItem("mycapacitorappnotification")!
    );
    setTheme(mode?.theme ?? "light");
    setLogin(login?.isLoggedIn ?? false);
    if (notificationService?.isNotificationEnabled) {
      requestNotificationPermission();
    }
  }, []);

  const requestNotificationPermission = async () => {
    RegisterPushNotification().then((res) => {
      if (res === true) {
        localStorage.setItem(
          "mycapacitorappnotification",
          JSON.stringify({ isNotificationEnabled: true })
        );
        setCheckedNotification(true);
      } else {
        localStorage.removeItem("mycapacitorappnotification");
        setCheckedNotification(false);
      }
    });
  };

  return (
    <Store>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Store>
  );
}

export default App;
