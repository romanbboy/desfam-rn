import AuthService from "../../services/AuthService";
import asyncStorage from '../../utils/asyncStorage'

const authActions = {
  registrationSuccess: (payload) => ({type: 'REGISTRATION_SUCCESS', payload}),
  registration: (form) => async (dispatch) => {
    return AuthService.registration(form)
      .then(async res => {
        await asyncStorage.storeData('accessToken', res.data.accessToken);
        dispatch(authActions.registrationSuccess(res.data));
      })
  },

  loginSuccess: (payload) => ({type: 'LOGIN_SUCCESS', payload}),
  login: (form) => async (dispatch) => {
    return AuthService.login(form)
      .then(async res => {
        await asyncStorage.storeData('accessToken', res.data.accessToken);
        dispatch(authActions.loginSuccess(res.data));
      })
  }
};

export default authActions;
