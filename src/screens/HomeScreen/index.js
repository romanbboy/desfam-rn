import React, {useEffect, useRef, useState} from 'react';
import * as Styled from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Wrapper from "../../components/wrapper";
import {MyText} from "../../components/typography";
import Container from "../../components/container";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import {MyButtonTiny} from "../../components/elements";
import {AddNewDatebook} from "../../components/add-new-datebook";
import {RefreshControl, ScrollView, View} from "react-native";
import actions from "../../store/actions";
import ListDatebooks from "../../components/list-datebooks";
import Invitation from "../../components/invitation";
import {SkeletonList, SkeletonList2} from "../../components/skeleton";
import * as Notifications from "expo-notifications";
import {registerForPushNotificationsAsync} from "../../utils/notifications";
import PersonalDatebook from "../../components/personal-datebook";

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const refScrollView = useRef();

  const currentUser = useSelector(state => state.auth.currentUser);
  const personalDatebook = useSelector(state => state.main.personalDatebook);
  const datebooks = useSelector(state => state.main.datebookList);
  const invitations = useSelector(state => state.main.invitations);

  const [showAddNewDatebook, setShowAddNewDatebook] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    await Promise.all([
      dispatch(actions.getPersonalDatebook()),
      dispatch(actions.getAllDatebooks()),
      dispatch(actions.getAllInvitations())
    ])
  }

  useEffect(() => {
    if (currentUser) {
      (async () => {
        await fetchData();

        let expoToken = await registerForPushNotificationsAsync();
        if (expoToken) await dispatch(actions.setExpoToken(expoToken));
      })()
    }
  }, [currentUser]);


  const onRefreshPage = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  // for notifications
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (lastNotificationResponse && lastNotificationResponse.notification.request.content.data.action) {
      const data = lastNotificationResponse.notification.request.content.data;

      switch(data.action) {
        case 'assignIssue':
          navigation.navigate('Datebook', {
            idDatebook: data.issue.datebook.id,
            targetDate: data.issue.date
          });
          break;
      }
    }
  },[lastNotificationResponse]);

  const scrollToTop = () => refScrollView.current.scrollTo({y: 0})

  return (
    <ScrollView ref={refScrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshPage} />}>
      <Wrapper>
        {!currentUser && <Container>
          <MyText style={{marginBottom: 5}}>?????????? ?????? ???????????????????????????? ?????? ????????, ?????? ????:</MyText>
          <MyText style={{fontFamily: 'open-semibold', marginBottom: 2}}>1. ?????????? ???????????? ????????????????</MyText>
          <MyText style={{fontFamily: 'open-semibold', marginBottom: 2}}>2. ?????????????????? ??????????????</MyText>
          <MyText style={{fontFamily: 'open-semibold', marginBottom: 2}}>3. ?????????????????? ?????????????????? ??????????????????</MyText>
        </Container>}

        {currentUser && <>

          {/*?????????????????????? ?? ?????????????????? ??????????????????*/}
          {!!invitations.length && <Styled.MainInvitations>
            {invitations.map(invitation => <Invitation key={invitation.id} invitation={invitation} />)}
          </Styled.MainInvitations>}


          {/*???????????? ????????????????*/}
          {!personalDatebook && <SkeletonList2 />}
          {personalDatebook && <PersonalDatebook scrollToTop={scrollToTop} />}


          {/*???????????????? ???????????????????? ??????????????????*/}
          {!showAddNewDatebook && <Styled.MainActions>
            <Styled.MainAction>
              <MyText style={{fontFamily: 'open-semibold', marginRight: 8}}>?????????????? ?????????????????? ????????????????</MyText>
              <MyButtonTiny onPress={() => setShowAddNewDatebook(true)}>
                <Icon name='plus-square' fill={THEME.BLUE_COLOR} style={{width: 35, height: 35}} />
              </MyButtonTiny>
            </Styled.MainAction>
          </Styled.MainActions>}

          {showAddNewDatebook && <AddNewDatebook onClose={() => setShowAddNewDatebook(false)} />}

          {/*???????????? ?????????????????? ????????????????????*/}
          {!datebooks && <SkeletonList />}
          {datebooks && <View>
            {!!datebooks.length && <ListDatebooks datebooks={datebooks} user={currentUser} />}
            {!datebooks.length && <Container>
              <MyText style={{textAlign: 'center'}}>?????? ???????????????? ???????????? ?????????????????? ????????????????????</MyText>
            </Container>}
          </View>}
        </>}

      </Wrapper>
    </ScrollView>
  )
}

export default HomeScreen;
