import React, { useState } from 'react'
import AppLoading from 'expo-app-loading';
import {bootstrap} from './src/bootstrap'
import { Provider } from 'react-redux'
import {store} from './src/store'
import AppNavigation from './src/navigation/AppNavigation'
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Layout, Text} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import MyToast from "./src/components/toast";

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
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </ApplicationProvider>
      <MyToast />
    </>
  )
}

export default App;
