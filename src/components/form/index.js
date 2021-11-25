import React from 'react';
import styled from 'styled-components/native';
import {THEME} from "../../styles";


export const FormWrap = styled.View`
  margin: 10px 0;
`

export const FormGroup = styled.View`
  margin-bottom: 10px;
  ${props => props.styles}
`

export const FormLabel = styled.Text`
  line-height: 30px;
  color: ${THEME.TEXT_COLOR};
  font-size: 14px;
  font-family: open-regular;
`

export const FormActions = styled.View`
  flex-direction: row;
  margin: 20px 0 10px;
  ${props => props.styles}
`
