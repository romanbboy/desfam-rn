import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastService from "../../components/toast/ToastService";

export default {
  async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      ToastService.show('AsyncStorage storeData не сработал', 'error')
    }
  },

  async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      ToastService.show('AsyncStorage getData не сработал', 'error');
    }
  },

  async removeItem (value) {
    try {
      await AsyncStorage.removeItem(value)
    } catch(e) {
      console.log('-----> ', e);
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log('-----> ', e);
    }
  }
}


