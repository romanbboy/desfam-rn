import React from 'react'
import styled from 'styled-components/native';
import {THEME} from "../../styles";

export const MyText = styled.Text`
  font-size: 14px;
  font-family: open-regular;
  color: ${THEME.TEXT_COLOR}
`;

export const H1Text = styled.Text`
  font-size: 28px;
  font-family: open-semibold;
  color: ${THEME.TEXT_COLOR}
`

export const Link = styled.Text`
  font-size: 14px;
  font-family: open-regular;
  color: ${props => props.active ? THEME.LINK_COLOR_ACTIVE : THEME.LINK_COLOR};
  ${props => props.styles}
`;

