import React, {useState, Fragment} from 'react'
import styled from 'styled-components/native';
import { Pressable, Platform, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import SvgLogo from '../icons/logo';
import {Link} from '../typography'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import actions from "../../store/actions";

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
                             size={20} />
          </Link>
          <Image source={require('../../../assets/img/avatar-plug.jpg')}
                 style={{width: 60, height: 60, borderRadius: 50}} />
          <Link onPress={logOut}>
            <FontAwesomeIcon icon={ faSignOutAlt } style={{color: '#ee246d'}} size={20} />
          </Link>
        </Fragment>}
      </HeaderPanel>
    </HeaderWrap>
  )
};

export default Header
