import React from "react";
import { Box } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  RegisterPushNotification,
  unregisterPushNotification,
} from "../pushNotification";
import myService from "../Myplugin/MyPlugin";
import { Toast } from "@capacitor/toast";
import { AuthContext } from "../Store";
import { isPlatform } from "@ionic/react";
import { setLocalStorageData } from "../utils/helper";

const Settings = () => {
  const context = React.useContext(AuthContext);
  const { checkedNotification, setCheckedNotification } = context;
  const [checkedLocation, setCheckedLocation] = React.useState(false);
  const { theme, setTheme } = context;

  const createTost = async (msg: string) => {
    await Toast.show({
      text: msg,
    });
  };

  React.useEffect(() => {
    const notificationService = JSON.parse(
      localStorage.getItem("mycapacitorappnotification")!
    );
    const locationService = JSON.parse(
      localStorage.getItem("mycapacitorappLocation")!
    );
    setCheckedNotification(notificationService?.isNotificationEnabled ?? false);
    setCheckedLocation(locationService?.isLocationServiceEnabled ?? false);
  }, []);

  const AndroidSettings = (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={checkedNotification}
            onChange={(e) => {
              if (checkedNotification) {
                unregisterPushNotification();
                localStorage.removeItem("mycapacitorappnotification");
                setCheckedNotification(false);
              } else {
                RegisterPushNotification().then((res) => {
                  if (res === true) {
                    setLocalStorageData("mycapacitorappnotification", {
                      isNotificationEnabled: true,
                    });
                    setCheckedNotification(true);
                  } else {
                    setCheckedNotification(false);
                    localStorage.removeItem("mycapacitorappnotification");
                  }
                });
              }
            }}
          />
        }
        label="Allow Notification"
      />

      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={checkedLocation}
            onChange={(e) => {
              if (checkedLocation) {
                myService
                  .StopService()
                  .then((res) => {
                    console.log(res);
                    setCheckedLocation(false);
                    localStorage.removeItem("mycapacitorappLocation");
                  })
                  .catch((err) => {
                    console.log("error", err);
                    createTost("Something went wrong!");
                  });
              } else {
                myService
                  .StartService()
                  .then((res) => {
                    console.log(res);
                    setCheckedLocation(true);
                    setLocalStorageData("mycapacitorappLocation", {
                      isLocationServiceEnabled: true,
                    });
                  })
                  .catch((err) => {
                    console.log("Error", err);
                    createTost("Something went wrong!");
                  });
              }
            }}
          />
        }
        label="Allow Location Service"
      />
    </React.Fragment>
  );

  const themeChange = (theme: string): void => {
    setTheme(theme);
    setLocalStorageData("mycapacitorapptheme", { theme: theme });
    window.location.reload();
  };

  return (
    <Box sx={{ padding: "1rem", width: "100%" }}>
      {isPlatform("android") ? AndroidSettings : null}
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={theme === "dark" ? true : false}
            onChange={(e) => {
              if (theme === "dark") {
                themeChange("light");
              } else {
                themeChange("dark");
              }
            }}
          />
        }
        label="Dark theme"
      />
    </Box>
  );
};

export default Settings;
