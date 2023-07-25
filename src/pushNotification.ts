import { Toast } from "@capacitor/toast";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import { FCM } from "@capacitor-community/fcm";

export const RegisterPushNotification = async (): Promise<boolean> => {
  let permission: boolean = false;
  try {
    const permissionResult = await PushNotifications.checkPermissions();
    if (permissionResult.receive === "granted") {
      await register();
      permission = true;
    } else {
      await requestNotificationPermission().then((res) => {
        permission = res;
      });
    }
  } catch (error) {
    console.log(error, "Push Notification registration error");
    permission = false;
  }
  return permission;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  const requestResult = await PushNotifications.requestPermissions();
  if (requestResult.receive === "granted") {
    register();
    return true;
  } else {
    createTost("Please enable notification permissions");
    return false;
  }
};

const register = async (): Promise<void> => {
  PushNotifications.register();
  PushNotifications.addListener("registration", (token: Token) => {
    console.log(token.value, "Push notification message, registration");
    FCM.subscribeTo({ topic: "test-2" })
      .then((res) => {
        console.log("subscribe to topic", res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  PushNotifications.addListener("registrationError", (error: any) => {
    console.log(error, "Push notification message, registrationError");
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    (notification: PushNotificationSchema) => {
      console.log(
        notification,
        "Push notification message, pushNotificationReceived"
      );
    }
  );

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {
      console.log(notification.notification, "Push notification message");
    }
  );
};

export const unregisterPushNotification = async (): Promise<void> => {
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
