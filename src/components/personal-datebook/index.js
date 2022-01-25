import React, {useState} from 'react'
import styled from 'styled-components/native'
import {THEME} from "../../styles";
import {MyText} from "../typography";
import {View} from "react-native";
import {MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import * as Styled from "../datebook-settings/styles";
import IssueCreatorForm from "../issue-creator-form";
import PersonalIssueCreatorForm from "../personal-issue-creator-form";

const PersonalDatebookWrap = styled.View`

`;

const PersonalDatebookActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
`;

const PersonalDatebookAction = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PersonalDatebookSection = styled.View`
  margin-bottom: 10px;
`;
const PersonalDatebookSectionHeader = styled.Text`
  font-family: 'open-semibold';
  font-size: 20px;
  margin: 0 0 5px 0;
`;

const PersonalDatebook = (props) => {
  const [showIssueCreator, setShowIssueCreator] = useState(false);

  return (
    <PersonalDatebookWrap>

      {/*Настройки и создание задачи*/}
      {!showIssueCreator && <PersonalDatebookActions>
        <PersonalDatebookAction>
          <MyText style={{fontFamily: 'open-semibold', marginRight: 8}}>Создать новую задачу</MyText>
          <MyButtonTiny onPress={() => setShowIssueCreator(true)}>
            <Icon name='plus-circle' fill={THEME.BLUE_COLOR} style={{width: 35, height: 35}} />
          </MyButtonTiny>
        </PersonalDatebookAction>
      </PersonalDatebookActions>}

      {showIssueCreator && <PersonalIssueCreatorForm />}


      {/*Список задач*/}
      <PersonalDatebookSection>
        <PersonalDatebookSectionHeader style={{color: THEME.GREEN_COLOR}}>СЕГОДНЯ</PersonalDatebookSectionHeader>
      </PersonalDatebookSection>

      <PersonalDatebookSection>
        <PersonalDatebookSectionHeader style={{color: THEME.BLUE_COLOR_DARK}}>ЗАВТРА</PersonalDatebookSectionHeader>
      </PersonalDatebookSection>

      <PersonalDatebookSection>
        <PersonalDatebookSectionHeader style={{color: THEME.GRAY_COLOR_DARK}}>ПОТОМ</PersonalDatebookSectionHeader>
      </PersonalDatebookSection>
    </PersonalDatebookWrap>
  )
}

export default PersonalDatebook