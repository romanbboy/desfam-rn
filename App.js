import React, {useState} from 'react'
import AppLoading from 'expo-app-loading';
import {bootstrap} from './src/bootstrap'
import {Provider} from 'react-redux'
import {store} from './src/store'
import AppNavigation from './src/navigation/AppNavigation'
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import MyToast from "./src/components/toast";
import {StatusBar} from "react-native";
import moment from "moment";
import 'moment/min/locales';
import {THEME} from "./src/styles";
import {GestureHandlerRootView} from "react-native-gesture-handler";

moment.locale('ru');

const App = () => {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar barStyle='dark-content' backgroundColor={THEME.BG_COLOR} animated={true} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </ApplicationProvider>
      <MyToast />
    </GestureHandlerRootView>
  )
}

export default App;
