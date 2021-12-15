import React, {useCallback, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import Wrapper from "../../components/wrapper";
import {H2Text} from "../../components/typography";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import DatebookSettings from "../../components/datebook-settings";
import {ScrollView} from "react-native";

const DatebookScreen = ({route, navigation}) => {
  const { idDatebook } = route.params;

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const datebook = useSelector(state => state.datebook.info);

  useFocusEffect(
    useCallback(() => {
      dispatch(actions.getDatebook(idDatebook));
      return () => dispatch({type: 'EXIT_DATEBOOK'})
    }, [])
  );

  return (
    <ScrollView>
      <Wrapper>
        {currentUser && datebook && <>
          {/*Блок с выбором настроек*/}
          <DatebookSettings currentUser={currentUser} datebook={datebook} />


          <H2Text type="h1">Задачник "{datebook.title}"</H2Text>
        </>}
      </Wrapper>
    </ScrollView>
  );
}

export default DatebookScreen
