import React, {useState} from 'react'
import styled from 'styled-components/native'
import {THEME} from "../../styles";
import {MyText} from "../typography";
import {Button, Spinner} from "@ui-kitten/components";
import {useDispatch} from "react-redux";
import actions from "../../store/actions";
import ToastService from "../../services/ToastService";

const InvitationWrap = styled.View`
  padding: 14px 20px;
  margin-bottom: 14px;
  border-left-width: 5px;
  border-left-color: ${THEME.BLUE_COLOR_DARK};
  background-color: #b3e5fc;
  border-radius: 5px;
`

const InvitationText = styled.Text`
  font-size: 14px;
  font-family: open-regular;
  color: #044868;
`

const InvitationOptions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 16px;
`

const Invitation = ({invitation}) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const acceptInvitation = invitation => {
    setIsSubmitting(true);
    dispatch(actions.acceptInvitation(invitation))
      .then(() => ToastService.show('Задачник добавлен в конец списка'))
      .catch(e => ToastService.show(e.response.data, 'error'))
  }

  const rejectInvitation = invitation => {
    setIsSubmitting(true);
    dispatch(actions.rejectInvitation(invitation))
      .catch(e => ToastService.show(e.response.data, 'error'))
  }

  return (
    <InvitationWrap>
      <InvitationText>{invitation.referrer.username} приглашает в ежедневник <MyText style={{fontFamily: 'open-semibold', color: '#044868'}}>"{invitation.target.title}"</MyText></InvitationText>
      <InvitationOptions>
        {isSubmitting && <Spinner />}

        {!isSubmitting && <>
          <Button onPress={() => acceptInvitation(invitation)}
                  size='small'
                  status='success'
                  style={{marginRight: 8}}>
            <MyText>Принять</MyText>
          </Button>
          <Button onPress={() => rejectInvitation(invitation)}
                  size='small'
                  status='danger'
                  appearance='ghost'>
            <MyText>Отклонить</MyText>
          </Button>
        </>}
      </InvitationOptions>
    </InvitationWrap>
  )
}

export default Invitation
