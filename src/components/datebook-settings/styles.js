import styled from 'styled-components/native';

export const DatebookSettingsWrap = styled.View`
  
`;

export const DatebookSettingsActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 10px 20px;
`;

export const DatebookSettingsAction = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DatebookSettingsActionSmall = styled.View`
  font-weight: 400;
  font-size: 14px;

  span {
    margin-right: 10px;
  }

  i {
    font-size: 22px;
  }
  
  @media (max-width: 425px) {
    span {
      display: none;
    }
  }
`;

export const DatebookSettingsFormAddParticipant = styled.View`
  i {
    font-size: 35px;
  }
  
  .DatebookSettings__close-add-participant {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;
