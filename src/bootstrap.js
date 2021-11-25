import * as Font from 'expo-font'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-light': require('../assets/fonts/OpenSans/OpenSans-Light.ttf'),
      'open-regular': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      'open-semibold': require('../assets/fonts/OpenSans/OpenSans-Semibold.ttf'),
    })
  } catch (e) {
    console.log('Error: ', e)
  }
}