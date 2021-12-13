import React from 'react'
import styled, {css} from 'styled-components/native';
import Toast from 'react-native-toast-message';
import {THEME} from "../../styles";

const ToastWrap = styled.View`
  background-color: ${props=> props.type ? '' : ''};
  padding: 10px;
  border-radius: 5px;
  width: 84%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .95;
  
  ${props => (props.type === 'success' && css`
    background: #c8e6c9;
  `)}
  ${props => (props.type === 'error' && css`
    background: #ffe7e6;
  `)}
`;

export const ToastText = styled.Text`
  font-size: 14px;
  font-family: open-regular;
  text-align: center;
  
  ${props => (props.type === 'success' && css`
    color: #224a23;
  `)}
  ${props => (props.type === 'error' && css`
    color: ${THEME.RED_COLOR};
  `)}
`;

const toastConfig = {
  desfamToast: ({ props }) =>(<ToastWrap type={props.type}>
    <ToastText type={props.type}>{props.text}</ToastText>
  </ToastWrap>)
};

const MyToast = () => <Toast config={toastConfig} />

export default MyToast
