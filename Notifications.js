import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function Notification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [devicePushToken,setDevicePushToken] = useState('')
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForExpoPushNotificationsAsync().then(token => setExpoPushToken(token));
    //registerForDevicePushNotificationsAsync().then(token=>setDevicePushToken(token))

    //Executes whatever has to be done when a notification is recieved
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Recieved Notification!')
    });

    //Executes whatever has to be done when a user taps on a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Tapped on Notification!');
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

//Expo Push Notification tokens....
async function registerForExpoPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

//Device Push Notification tokens....
async function registerForDevicePushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }
}