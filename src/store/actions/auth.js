import AuthService from "../../services/AuthService";

const authActions = {
  registrationSuccess: (payload) => ({type: 'REGISTRATION_SUCCESS', payload}),
  registration: (form) => async (dispatch) => {
    return AuthService.registration(form)
      .then(res => {
        // localStorage.setItem('accessToken', res.data.accessToken);
        dispatch(authActions.registrationSuccess(res.data));
      })
  },

  loginSuccess: (payload) => ({type: 'LOGIN_SUCCESS', payload}),
  login: (form) => async (dispatch) => {
    return AuthService.login(form)
      .then(res => {
        localStorage.setItem('accessToken', res.data.accessToken);
        dispatch(authActions.loginSuccess(res.data));
      })
  }
};

export default authActions;
