import React, {useCallback, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import moment from "moment";

import Wrapper from "../../components/wrapper";
import {H2Text, MyText} from "../../components/typography";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import DatebookSettings from "../../components/datebook-settings";
import {ScrollView, View} from "react-native";
import Headline from "../../components/headline";
import IssueCreatorForm from "../../components/issue-creator-form";
import {FlexBlock} from "../../components/flex-block";
import {Icon} from "@ui-kitten/components";
import Notepad from "../../components/notepad";
import {SkeletonNotepad} from "../../components/skeleton";

const NotepadList = styled.View`
  margin-top: 15px;
`

const DatebookScreen = ({route, navigation}) => {
  const { idDatebook } = route.params;

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const datebook = useSelector(state => state.datebook.info);
  const issues = useSelector(state => state.datebook.issues);

  const [date, setDate] = useState(moment());
  const [showIssueCreator, setShowIssueCreator] = useState(false);
  const [usersIssues, setUsersIssues] = useState(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(actions.getDatebook(idDatebook));
      dispatch(actions.getDatebookIssues({idDatebook, date: moment()}));
      return () => dispatch({type: 'EXIT_DATEBOOK'})
    }, [])
  );

  useEffect(() => {
    if (issues) {
      const issuesMap = issues.reduce((res, item) => {
        if (!res[item.target.id]) res[item.target.id] = {user: item.target, issues: []};
        res[item.target.id].issues.push(item);

        return res;
      }, {});

      let usersIssues = Object.entries(issuesMap).map(([key, obj]) => ({user: obj.user, issues: obj.issues}));
      setUsersIssues(usersIssues);
    }
  }, [issues])

  const onSetDate = date => {
    setUsersIssues(null);
    setDate(date);
    dispatch(actions.getDatebookIssues({idDatebook, date: date}));
  }

  return (
    <ScrollView>
      <Wrapper>
        {currentUser && datebook && <>
          {/*Блок с выбором настроек*/}
          <DatebookSettings currentUser={currentUser} datebook={datebook} />

          {/*Основной контент*/}
          <H2Text type="h1">Задачник "{datebook.title}"</H2Text>
          <Headline date={date} setDate={onSetDate} issueCreator={{showIssueCreator, setShowIssueCreator}} />

          {showIssueCreator && <IssueCreatorForm date={date} datebook={datebook} />}

          {/*Задачники*/}
          {!usersIssues && <>
            <SkeletonNotepad />
            <SkeletonNotepad />
          </>}

          {usersIssues && <>
            {!!usersIssues.length && <>
              {usersIssues.map(el => <Notepad key={el.user.id} user={el.user} issues={el.issues} />)}
            </>}

            {!usersIssues.length && <FlexBlock alignItems="center" direction="column" styles={{marginVertical: 64}}>
              <Icon name='calendar-outline' fill="#26364B" style={{width: 50, height: 50}} />
              <MyText style={{marginTop: 24}}>Задачи отсутствуют</MyText>
            </FlexBlock>}
          </>}
        </>}
      </Wrapper>
    </ScrollView>
  );
}

export default DatebookScreen
