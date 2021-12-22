import React, {useState} from 'react'
import styled from "styled-components/native";
import {MyText} from "../typography";
import Picshow from "../picshow";
import getAvatar from '../../utils/getAvatar'
import {useDispatch, useSelector} from "react-redux";
import ModalService from "../modal/ModalService";
import actions from "../../store/actions";
import ToastService from "../toast/ToastService";

const IssueWrap = styled.Pressable`
  background-color: ${props => props.backGround};
  padding: 3px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

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
        }
      })
    }
  }

  return (
    <IssueWrap backGround={issue.status ? '#99e0a9' : '#eef2f8'}
               onPress={changeStatus}
               onLongPress={deleteIssue}>
      <MyText style={{fontSize: 13}}>{issue.content}</MyText>

      {issue.target.id !== issue.creator.id && (
        <Picshow source={getAvatar(issue.creator)}
                 avatarStyles={{width: 20, height: 20}}
                 styles={{position: 'absolute', right: -5, top: -5}} />
      )}
    </IssueWrap>
  )
}

export default Issue
