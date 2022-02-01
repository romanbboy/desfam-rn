import React from 'react'
import styled from 'styled-components/native'
import * as Clipboard from 'expo-clipboard';
import {MyText} from "../typography";
import ModalService from "../modal/ModalService";
import actions from "../../store/actions";
import ToastService from "../toast/ToastService";
import {useDispatch} from "react-redux";

const NoteWrap = styled.TouchableOpacity` 
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
`

const Note = ({note}) => {
  const dispatch = useDispatch();

  const copyToClipboard = () => {
    Clipboard.setString(note.note);
    ToastService.show('Скопировано в буфер обмена', 'success', {visibilityTime: 2000})
  }

  const deleteNote = () => {
    ModalService.confirm({
      msg: `Удалить заметку?`,
      accept: async () => {
        return dispatch(actions.deleteNote(note))
          .then(() => true)
          .catch(e => ToastService.show(e.response.data, 'error'))
      }
    })
  }

  return (
    <NoteWrap activeOpacity={0.7}
              onPress={copyToClipboard}
              onLongPress={deleteNote}>
      <MyText>{note.note}</MyText>
    </NoteWrap>
  )
}

export default Note