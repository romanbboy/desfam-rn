import React from 'react'
import styled from "styled-components/native";
import {MyText} from "../typography";
import Picshow from "../picshow";
import getAvatar from '../../utils/getAvatar'
import {useDispatch, useSelector} from "react-redux";
import ModalService from "../modal/ModalService";
import actions from "../../store/actions";
import ToastService from "../toast/ToastService";
import moment from "moment";
import {View} from "react-native";
import {THEME} from "../../styles";
import {Icon} from "@ui-kitten/components";
import * as Notifications from "expo-notifications";

const IssueWrap = styled.TouchableOpacity`
  background-color: ${props => props.backGround};
  padding: 3px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const IssueNotificationInfo = styled.View`
  background-color: rgba(255, 255, 255, .7);
  padding: 3px;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  border-color: ${THEME.GRAY_COLOR_DARK}
  border-width: 1px;
  margin-right: -5px; 
`;

const Issue = ({issue}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);

  const changeStatus = () => {
    if ([issue.target.id, issue.creator.id].includes(currentUser.id)) {
      ModalService.confirm({
        msg: issue.status ? `Отменить готовность?` : `Задача выполнена?`,
        accept: async () => {
          return dispatch(actions.changeStatusIssue(issue))
            .then(() => true)
            .catch(e => ToastService.show(e.response.data, 'error'))
        }
      })
    }
  }

  const deleteIssue = () => {
    if (currentUser.id === issue.creator.id) {
      ModalService.confirm({
        msg: `Удалить задачу?`,
        accept: async () => {
          return dispatch(actions.deleteIssue(issue))
            .then(() => true)
            .catch(e => ToastService.show(e.response.data, 'error'))
            .finally(async () => {
              if (issue.notification) {
                await Notifications.cancelScheduledNotificationAsync(issue.notification);
              }
            })
        }
      })
    }
  }

  return (
    <IssueWrap backGround={issue.status ? '#99e0a9' : '#eef2f8'}
               activeOpacity={0.7}
               underlayColor='#A4C936'
               onPress={changeStatus}
               onLongPress={deleteIssue}>
      <View style={{flex: 1, marginRight: 5}}>
        <MyText style={{fontSize: 13}}>{issue.content}</MyText>
      </View>

      {!!issue.notification && <IssueNotificationInfo>
        <Icon name='bell-outline' fill={THEME.GRAY_COLOR_DARK} style={{width: 12, height: 12}} />
        <MyText style={{fontSize: 10, marginLeft: 3}}>{moment(issue.date).format('HH:mm')}</MyText>
      </IssueNotificationInfo>}

      {issue.target.id !== issue.creator.id && (
        <Picshow source={getAvatar(issue.creator)}
                 avatarStyles={{width: 20, height: 20}}
                 styles={{position: 'absolute', right: -5, top: -5}} />
      )}
    </IssueWrap>
  )
}

export default Issue
