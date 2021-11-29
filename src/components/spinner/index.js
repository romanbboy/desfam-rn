import {Animated, Easing} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Spinner = () => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {toValue: 1, duration: 1000, useNativeDriver: false})
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <FontAwesomeIcon icon={ faSpinner } style={{color: '#fff'}} size={16}/>
    </Animated.View>
  )
}

export default Spinner;
