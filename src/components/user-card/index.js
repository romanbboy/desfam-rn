import React from 'react'
import styled from 'styled-components/native'
import {THEME} from "../../styles";
import {MyText} from "../typography";
import {Button} from "@ui-kitten/components";
import Picshow from "../picshow";
import getAvatar from '../../utils/getAvatar'

const UserCardWrap = styled.View`
  background: #fff;
  border-radius: 3px;
  padding: 8px;
  margin: 5px 0;
  shadow-color: #0003;
  shadow-offset: 0 1px;
  shadow-opacity: 2;
  shadow-radius: 3px;
  elevation: 6;
`
const UserCardHeader = styled.View`
  align-items: center;
  flex-direction: row;
`

const UserCardAvatar = styled.View`
  margin-right: 15px;
`

const UserCardInfo = styled.View`
  flex: 1;
`

const UserCardUsername = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${THEME.BG_COLOR};
  padding: 3px;
  flex-direction: row;
  justify-content: flex-end;
`

const UserCardHeaderActions = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  padding: 5px 0;
  align-items: center;
`


const UserCard = ({user, remove}) => {


  return (
    <UserCardWrap>
      <UserCardHeader>
        <UserCardAvatar>
          <Picshow source={getAvatar(user)} />
        </UserCardAvatar>
        <UserCardInfo>
          <UserCardUsername>
            <MyText style={{fontFamily: 'open-semibold', textAlign: 'right'}}>{user.username}</MyText>
          </UserCardUsername>
          <UserCardHeaderActions>
            <Button onPress={() => remove(user)}
                    size='small'
                    status='danger'
                    appearance='ghost'
                    style={{paddingHorizontal: 0, paddingVertical: 0, minHeight: 'auto', minWidth: 'auto'}}>
              {() => <MyText style={{fontSize: 12, color: THEME.RED_COLOR}}>Удалить</MyText>}
            </Button>
          </UserCardHeaderActions>
        </UserCardInfo>
      </UserCardHeader>
    </UserCardWrap>
  )
}

export default UserCard
