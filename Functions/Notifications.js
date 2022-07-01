import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "./FireBase";
import { ref, update } from "firebase/database";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForExpoPushNotificationsAsync().then((token) =>
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          signInAnonymously(auth).then(() => {
            update(ref(db, "/Tokens"), { token: token });
          });
        }
      })
    );

    //Executes whatever has to be done when a notification is recieved
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Recieved Notification!");
      });

    //Executes whatever has to be done when a user taps on a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Tapped on Notification!");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //Expo Push Notification tokens....
  async function registerForExpoPushNotificationsAsync() {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }
  //End...
}
