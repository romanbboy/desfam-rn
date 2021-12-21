import React, {useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import moment from "moment";

import Wrapper from "../../components/wrapper";
import {H2Text} from "../../components/typography";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import DatebookSettings from "../../components/datebook-settings";
import {ScrollView, View} from "react-native";
import Headline from "../../components/headline";
import IssueCreatorForm from "../../components/issue-creator-form";

const DatebookScreen = ({route, navigation}) => {
  const { idDatebook } = route.params;

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const datebook = useSelector(state => state.datebook.info);

  const [date, setDate] = useState(moment());
  const [showIssueCreator, setShowIssueCreator] = useState(true)

  useFocusEffect(
    useCallback(() => {
      dispatch(actions.getDatebook(idDatebook));
      return () => dispatch({type: 'EXIT_DATEBOOK'})
    }, [])
  );

  const onSetDate = date => {
    setShowIssueCreator(moment(date).isSameOrAfter(moment(), 'day'));
    setDate(date);
  }

  return (
    <ScrollView>
      <Wrapper>
        {currentUser && datebook && <>
          {/*Блок с выбором настроек*/}
          <DatebookSettings currentUser={currentUser} datebook={datebook} />

          {/*Основной контент*/}
          <H2Text type="h1">Задачник "{datebook.title}"</H2Text>
          <Headline date={date} setDate={onSetDate} />

          {showIssueCreator && <IssueCreatorForm date={date} datebook={datebook} />}

        </>}
      </Wrapper>
    </ScrollView>
  );
}

export default DatebookScreen
