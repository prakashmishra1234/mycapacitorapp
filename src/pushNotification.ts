import { Toast } from "@capacitor/toast";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";

export const RegisterPushNotification = () => {
  PushNotifications.checkPermissions().then((res) => {
    if (res.receive === "denied") {
      PushNotifications.requestPermissions().then((res) => {
        if (res.receive === "denied") {
          createTost("Push Notification permission denied");
        } else {
          createTost("Push Notification permission granted");
          register();
        }
      });
    } else {
      createTost("Push Notification permission granted");
      register();
    }
  });
};

const register = async () => {
  PushNotifications.register();

  PushNotifications.addListener("registration", (token: Token) => {
    console.log(token.value, "Push notification message");
  });

  PushNotifications.addListener("registrationError", (error: any) => {
    console.log(error, "Push notification message");
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    (notification: PushNotificationSchema) => {
      console.log(notification, "Push notification message");
    }
  );

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {
      console.log(notification.notification, "Push notification message");
    }
  );
};

export const unregisterPushNotification = async () => {
  await PushNotifications.unregister();
  await PushNotifications.removeAllListeners();
  await PushNotifications.removeAllDeliveredNotifications();
  createTost("Unregistered for push notification");
};

const createTost = async (msg: string) => {
  await Toast.show({
    text: msg,
  });
};
