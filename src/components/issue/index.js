import React, {useState} from 'react'
import styled from "styled-components/native";
import {MyText} from "../typography";
import Picshow from "../picshow";
import getAvatar from '../../utils/getAvatar'

const IssueWrap = styled.Pressable`
  background-color: ${props => props.backGround};
  padding: 3px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

const Issue = ({issue}) => {
  const [bg, setBg] = useState('#eef2f8');

  return (
    <IssueWrap backGround={bg}
               onPressOut={() => setBg('#eef2f8')}
               onPressIn={() => setBg('#d5dfee')}>
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
