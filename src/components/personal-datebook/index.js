import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import moment from 'moment';
import {THEME} from "../../styles";
import {MyText} from "../typography";
import {View} from "react-native";
import {MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import PersonalIssueCreatorForm from "../personal-issue-creator-form";
import {useSelector} from "react-redux";
import {filterIssuesByDays} from "../../utils/filterIssuesByDays";
import Issue from "../issue";
// import {LinearGradient} from "expo-linear-gradient";
import {FlexBlock} from "../flex-block";
// import {SkeletonList2} from "../skeleton";

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
  margin-bottom: 5px;
`;
const PersonalDatebookSectionHeader = styled.Text`
  font-family: 'open-semibold';
  font-size: 20px;
  margin: 0 0 12px 0;
`;

const PersonalDatebook = () => {
  const personalDatebook = useSelector(state => state.main.personalDatebook);

  const [showIssueCreator, setShowIssueCreator] = useState(false);
  const [filteredIssues, setFilteredIssues] = useState(null);
  
  useEffect(() => {
    setFilteredIssues(filterIssuesByDays(personalDatebook.issues))
  }, [personalDatebook.issues])

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

      {showIssueCreator && <PersonalIssueCreatorForm onClose={() => setShowIssueCreator(false)} />}


      {/*Список задач*/}
      {filteredIssues && <>
        {!filteredIssues.today.length && <View style={{alignItems: 'center', marginVertical: 30}}>
          <Icon name='checkmark-circle' fill={THEME.GREEN_SUCCESS} style={{width: 50, height: 50}} />
          <MyText style={{marginTop: 8}}>На сегодня задач нет</MyText>
        </View>}

        {!!filteredIssues.today.length && <PersonalDatebookSection style={{marginBottom: 20}}>
          <PersonalDatebookSectionHeader style={{color: THEME.GREEN_COLOR}}>СЕГОДНЯ</PersonalDatebookSectionHeader>
          {filteredIssues.today.map(issue => <Issue issue={issue} key={issue.id} type='personal' />)}
        </PersonalDatebookSection>}

        {!!filteredIssues.tomorrow.length && <PersonalDatebookSection>
          <PersonalDatebookSectionHeader style={{color: THEME.BLUE_COLOR_DARK}}>ЗАВТРА</PersonalDatebookSectionHeader>
          {filteredIssues.tomorrow.map(issue => <Issue issue={issue} key={issue.id} type='personal' />)}
        </PersonalDatebookSection>}

        {!!filteredIssues.later.length && <PersonalDatebookSection>
          <PersonalDatebookSectionHeader style={{color: THEME.GRAY_COLOR_DARK}}>ПОТОМ</PersonalDatebookSectionHeader>
          {filteredIssues.later.map(issue => {
            return (<View key={issue.id}>
              <FlexBlock justifyContent='flex-end' styles={{marginBottom: 3}}>
                <MyText style={{fontSize: 10, color: THEME.GRAY_COLOR_DARK}}>{moment(issue.date).format('D MMMM')}</MyText>
              </FlexBlock>
              <Issue issue={issue} type='personal' />
            </View>)
          })}
        </PersonalDatebookSection>}
      </>}

      {/*<LinearGradient
        start={{x: 0, y: 1}} end={{x: 1, y: 1}}
        locations={[0, 0.15, 0.85, 1]}
        colors={['rgba(255,255,255, 0)', '#cad6f4', '#cad6f4', 'rgba(255,255,255, 0)']}
        style={{height: .5, marginVertical: 15}}
      />*/}
    </PersonalDatebookWrap>
  )
}

export default PersonalDatebook