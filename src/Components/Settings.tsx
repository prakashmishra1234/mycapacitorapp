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

const Settings = () => {
  const context = React.useContext(AuthContext);
  const [checkedNotification, setCheckedNotification] = React.useState(false);
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
              } else {
                RegisterPushNotification();
                localStorage.setItem(
                  "mycapacitorappnotification",
                  JSON.stringify({ isNotificationEnabled: true })
                );
              }
              setCheckedNotification(!checkedNotification);
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
                    localStorage.setItem(
                      "mycapacitorappLocation",
                      JSON.stringify({ isLocationServiceEnabled: true })
                    );
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
                setTheme("light");
                localStorage.setItem(
                  "mycapacitorapptheme",
                  JSON.stringify({ theme: "light" })
                );
              } else {
                setTheme("dark");
                localStorage.setItem(
                  "mycapacitorapptheme",
                  JSON.stringify({ theme: "dark" })
                );
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
