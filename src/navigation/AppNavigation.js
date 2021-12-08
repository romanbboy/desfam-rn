import React, {useEffect} from 'react'
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

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = await asyncStorage.getData('accessToken');
      accessToken && dispatch(actions.getCurrentUser());
    })();
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
