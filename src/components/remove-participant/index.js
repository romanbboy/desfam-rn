import React from 'react'
import Container from "../container";
import {MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import styled from "styled-components/native/dist/styled-components.native.esm";
import {H2Text, H3Text, MyText} from "../typography";
import UserCard from "../user-card";
import {useDispatch, useSelector} from "react-redux";
import ModalService from "../modal/ModalService";
import actions from "../../store/actions";
import ToastService from "../toast/ToastService";


const RemoveParticipantWrap = styled.View`
  margin: 20px 0 10px;
`

const RemoveParticipantClose = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
`

const RemoveParticipantList = styled.View`
  margin-top: 24px;
`

const RemoveParticipant = ({onClose}) => {
  const dispatch = useDispatch();

  const datebook = useSelector(state => state.datebook.info);
  const currentUser = useSelector(state => state.auth.currentUser);

  const confirmRemoveParticipant = user => {
    ModalService.confirm({
      msg: `Убрать ${user.username} из ежедневника?`,
      accept: async () => {
        return dispatch(actions.deleteParticipant({datebook, participant: user}))
          .then(() => {
            ToastService.show('Участник удален')
            return true;
          })
          .catch(e => ToastService.show(e.response.data, 'error'))
      }
    })
  }

  return (
    <Container>
      <RemoveParticipantClose>
        <MyButtonTiny onPress={onClose}>
          <Icon name='close-outline' style={{width: 30, height: 30}}/>
        </MyButtonTiny>
      </RemoveParticipantClose>

      <RemoveParticipantWrap>
        <H3Text>Удаление участников ежедневника "{datebook.title}"</H3Text>

        {datebook.participants.length === 1 &&
          (<MyText style={{textAlign: 'center', marginTop: 15}}>Ты - единственный участник этого ежедневника</MyText>)
        }

        {datebook.participants.length > 1 && <RemoveParticipantList>
          {datebook.participants.map(user => {
            if (user.id !== currentUser.id) {
              return <UserCard key={user.id} user={user} remove={confirmRemoveParticipant}/>
            }
          })}
        </RemoveParticipantList>}

      </RemoveParticipantWrap>
    </Container>
  )
}

export default RemoveParticipant
