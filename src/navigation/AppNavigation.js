import React, {useEffect, useRef, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen'
import Header from '../components/header'
import {THEME} from "../styles";
import asyncStorage from "../utils/asyncStorage";
import actions from "../store/actions";
import {useDispatch} from "react-redux";
import {SafeAreaProvider} from "react-native-safe-area-context";
import DatebookScreen from "../screens/DatebookScreen";
import {registerForPushNotificationsAsync} from "../utils/notifications";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AppNavigation = () => {
  const dispatch = useDispatch();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      const accessToken = await asyncStorage.getData('accessToken');
      if (accessToken) {
        // todo Не дает получить expoToken, из-за этого не давало зайти в currentUser
        // let expoToken = await registerForPushNotificationsAsync();
        //
        // if (expoToken) await dispatch(actions.setExpoToken(expoToken));
        dispatch(actions.getCurrentUser());
      }
    })();

    // Этот прослушиватель запускается всякий раз, когда получено уведомление, когда приложение находится на переднем плане
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Этот прослушиватель запускается всякий раз, когда пользователь нажимает на уведомление или взаимодействует с ним (работает, когда приложение находится на переднем плане, на заднем плане или убито).
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('killed');
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Datebook" component={DatebookScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const screenOptions = {
  header: (props) => <Header {...props} />,
  cardStyle: {backgroundColor: THEME.BG_COLOR},
  headerMode: 'float'
}


export default AppNavigation
