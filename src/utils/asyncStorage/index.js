import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('-----> ', e);
    }
  },

  async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log('-----> ', e);
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


