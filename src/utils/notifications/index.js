// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";
import ToastService from "../../components/toast/ToastService";

export const registerForPushNotificationsAsync = async () => {
  let token, finalStatus;
  if (Platform.OS !== 'web') {

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      finalStatus = existingStatus;
    } catch (e) {
      ToastService.show(`Error Notifications.getPermissionsAsync (${e})`, 'error');
    }

    if (finalStatus !== 'granted') {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      } catch (e) {
        ToastService.show(`Error Notifications.requestPermissionsAsync (${e})`, 'error');
      }
    }

    if (finalStatus !== 'granted') {
      ToastService.show(`Не получилось получить токен для Push уведомлений (${finalStatus})`, 'error');
      return;
    }

    try {
      let tokenData = await Notifications.getExpoPushTokenAsync();
      token = tokenData.data;
    } catch (e) {
      ToastService.show(`Notifications.getExpoPushTokenAsync (${token})`, 'error');
    }

    if (!token) ToastService.show(`Error Notifications.getExpoPushTokenAsync (${token})`, 'error');

  } else {
    console.log('-----> ', 'Пуш уведомления только для телефонов, пока что');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const sendPushNotification = async (message) => {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
