import React, {useState, Fragment} from 'react'
import styled from 'styled-components/native';
import { Pressable, Platform, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import SvgLogo from '../icons/logo';
import {Link} from '../typography'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import actions from "../../store/actions";
import Picshow from "../picshow";

const HeaderWrap = styled.View`
  flex-direction: row;
  padding: ${Platform.OS === 'ios' ? '50px 20px' : '20px 10px'};
  justify-content: space-between;
  align-items: center
`;

const HeaderPanel = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
`

const Header = ({navigation, route}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);

  const getAvatar = () => {
    if (currentUser.avatar) {
      let prefix = process.env.NODE_ENV === 'development' ? 'http://10.0.0.135' : '';
      return {uri: `${prefix}${currentUser.avatar}`};
    }
    return require('../../../assets/img/avatar-plug.jpg');
  };

  const logOut = () => {
    dispatch(actions.logout())
      .then(() => navigation.navigate('Login'));
  }

  return (
    <HeaderWrap>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <SvgLogo />
      </Pressable>

      <HeaderPanel>
        {!currentUser && <Fragment>
          <Link onPress={() => navigation.navigate('Registration')}
                active={route.name === 'Registration'}
                styles={{fontFamily: 'open-light', fontSize: '16px'}}>
            Регистрация
          </Link>

          <Link onPress={() => navigation.navigate('Login')}
                active={route.name === 'Login'}
                styles={{fontFamily: 'open-light', fontSize: '16px'}}>
            Вход
          </Link>
        </Fragment>}

        {currentUser && <Fragment>
          <Link onPress={() => navigation.navigate('Settings')}>
            <FontAwesomeIcon icon={ faCog }
                             style={{color: route.name === 'Settings' ? '#5b687f' : '#828ea5'}}
                             size={40} />
          </Link>
          <Picshow source={getAvatar()} />
          <Link onPress={logOut}>
            <FontAwesomeIcon icon={ faSignOutAlt } style={{color: '#ee246d'}} size={20} />
          </Link>
        </Fragment>}
      </HeaderPanel>
    </HeaderWrap>
  )
};

export default Header
