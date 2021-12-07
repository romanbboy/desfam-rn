import React from 'react'
import styled, {css} from 'styled-components/native';
import {THEME} from "../../styles";

export const FieldNotice = styled.Text`
  font-size: 12px;
  margin-top: 8px;
  color: ${THEME.RED_COLOR};
  
  ${props => (props.type === 'success' && css`
    color: ${THEME.GREEN_SUCCESS};
  `)}
  
  ${props => (props.type === 'error' && css`
    color: ${THEME.RED_COLOR};
  `)}
`;
