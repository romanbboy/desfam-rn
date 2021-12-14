import Toast from "react-native-toast-message";

export default {
  show: (
    text,
    type = 'success',
    {visibilityTime} = {
      visibilityTime: 4000
    }
  ) => {
    Toast.show({
      type: 'desfamToast',
      topOffset: 50,
      props: {
        text, type
      },
      visibilityTime
    });
  }
}
