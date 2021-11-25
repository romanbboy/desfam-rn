import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {THEME} from "../../styles";
import {Pressable, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {MyText} from "../typography";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


// INPUT
const InputStyled = styled.TextInput`
  border: 1px solid;
  font-size: 14px;
  border-radius: 5px;
  padding: 8px 6px 6px;
  font-family: open-regular;
  ${props => props.styles}
`

export const Input = (props) => {
  const [borderColor, setBorderColor] = useState(THEME.GREEN_COLOR);

  useEffect(() => {
    setBorderColor(props.status === 'success' ? THEME.GREEN_COLOR : THEME.RED_COLOR);
  }, [props.status])

  return (
    <InputStyled {...props} styles={{borderColor}} />
  )
}


// BUTTON
export const ButtonStyled = styled.View`
  padding: 8px 12px;
  color: #fff;
  font-family: open-regular;
  font-size: 14px;
  border-radius: 8px;
  ${props => props.styles}
`
export const MyButton = (props) => {
  const [bgColor, setBgColor] = useState(THEME.BLUE_COLOR);

  return (
    <TouchableWithoutFeedback onPress={props.onPress}
                              onPressIn={() => setBgColor(THEME.BLUE_COLOR_DARK)}
                              onPressOut={() => setBgColor(THEME.BLUE_COLOR)}
                              disabled={props.disabled} >
      <ButtonStyled styles={{backgroundColor: props.disabled ? THEME.GRAY_COLOR : bgColor}}>
        {!props.isSubmitting && <MyText style={{color: '#fff'}}>{props.children}</MyText>}
        {!!props.isSubmitting && <FontAwesomeIcon icon={ faSpinner } style={{color: '#fff'}} size={16} spin/>}
      </ButtonStyled>
    </TouchableWithoutFeedback>
  )
}

