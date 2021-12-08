import styled from 'styled-components/native';

export const FlexBlock = styled.View`
  flex-wrap: ${props => props.wrap || 'nowrap'};
  flex-direction: ${props => props.direction || 'row'};
  flex: ${props => props.flex || 'auto'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};

  ${props => props.styles}
`;
