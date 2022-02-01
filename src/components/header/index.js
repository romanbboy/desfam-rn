import React, {Fragment} from 'react'
import styled from 'styled-components/native';
import {Platform, Pressable} from 'react-native';
import {useSelector} from "react-redux";
import getAvatar from '../../utils/getAvatar'
import SvgLogo from '../icons/logo';
import {Link} from '../typography'
import Picshow from "../picshow";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";

const HeaderWrap = styled.View`
  flex-direction: row;
  padding: ${Platform.OS === 'ios' ? '50px 20px 20px' : '10px'};
  justify-content: space-between;
  align-items: center;
  background-color: ${THEME.BG_COLOR};
`;

const HeaderPanel = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const Header = ({navigation, route}) => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <HeaderWrap>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <SvgLogo />
      </Pressable>

      <HeaderPanel>
        {!currentUser && <Fragment>
          <Link onPress={() => navigation.navigate('Registration')}
                active={route.name === 'Registration'}
                styles={{fontFamily: 'open-light', fontSize: '16px', marginRight: 20}}>
            Регистрация
          </Link>

          <Link onPress={() => navigation.navigate('Login')}
                active={route.name === 'Login'}
                styles={{fontFamily: 'open-light', fontSize: '16px'}}>
            Вход
          </Link>
        </Fragment>}

        {currentUser && <Fragment>
          <Link onPress={() => navigation.navigate('Notes')}>
            <Icon name='clipboard-outline'
                  fill={route.name === 'Notes' ? THEME.BLUE_COLOR : THEME.BLUE_COLOR_LIGHT}
                  style={{width: 28, height: 28}} />
          </Link>
          <Link onPress={() => navigation.navigate('Settings')}>
            <Icon name='settings' fill={route.name === 'Settings' ? '#5b687f' : '#828ea5'} style={{width: 28, height: 28, marginHorizontal: 22}} />
          </Link>
          <Picshow source={getAvatar(currentUser)} />
        </Fragment>}
      </HeaderPanel>
    </HeaderWrap>
  )
};

export default Header
