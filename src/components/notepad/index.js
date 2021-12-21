import React from 'react'
import * as Styled from './styles'
import Container from "../container";
import {MyText} from "../typography";
import Picshow from "../picshow";
import getAvatar from '../../utils/getAvatar'
import Issue from "../issue";


const Notepad = ({user, issues}) => {
  return (
    <Container>
      <Styled.NotepadHead>
        <Styled.NotepadAvatar>
          <Picshow source={getAvatar(user)} />
        </Styled.NotepadAvatar>

        <Styled.NotepadUserInfo>
          <MyText style={{fontFamily: 'open-semibold', fontSize: 18, textAlign: 'right'}}>{user.username}</MyText>
          {!!user.position && <MyText style={{fontSize: 12, textAlign: 'right'}}>{user.position}</MyText>}
        </Styled.NotepadUserInfo>
      </Styled.NotepadHead>

      <Styled.NotepadPlan>
        <Styled.NotepadList>
          {issues.map(issue => <Issue key={issue.id} issue={issue} />)}
        </Styled.NotepadList>
      </Styled.NotepadPlan>
    </Container>
  )
}

export default Notepad
