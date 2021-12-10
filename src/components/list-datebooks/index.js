import React from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Styled from './styles'
import Container from "../container";
import {H2Text, Link} from "../typography";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";

const ListDatebooks = ({user, datebooks}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <H2Text type="h1" style={{marginBottom: 20}}>Все задачники</H2Text>

      {datebooks.map(datebook => <Styled.ListDatebooksItem key={datebook.id}>
        <Styled.ListDatebooksItemIcon>
          {user.id === datebook.creator && <Icon name='person' fill={THEME.BLUE_COLOR} style={{width: 20, height: 20}} />}
          {user.id !== datebook.creator && <Icon name='bookmark' fill={THEME.BLUE_COLOR} style={{width: 20, height: 20}} />}
        </Styled.ListDatebooksItemIcon>

        <Styled.ListDatebooksItemName>
          <Link onPress={() => navigation.navigate('Datebook', {idDatebook: datebook.id})} style={{color: THEME.GREEN_COLOR_DARK}}>
            {datebook.title}
          </Link>
        </Styled.ListDatebooksItemName>
      </Styled.ListDatebooksItem>)}
    </Container>
  )
}

export default ListDatebooks
