import UserService from "../../services/UserService";
import asyncStorage from "../../utils/asyncStorage";

const userActions = {
  getCurrentUserSuccess: (payload) => ({type: 'GET_CURRENT_USER_SUCCESS', payload}),
  getCurrentUser: () => async (dispatch) => {
    return UserService.getCurrentUser()
      .then(res => {
        dispatch(userActions.getCurrentUserSuccess(res.data));
      })
  },

  updateCurrentUserSuccess: (payload) => ({type: 'UPDATE_CURRENT_USER_SUCCESS', payload}),
  updateCurrentUser: (form) => async (dispatch) => {
    return UserService.updateCurrentUser(form)
      .then(res => {
        dispatch(userActions.updateCurrentUserSuccess(res.data));
      })
  },

  logoutSuccess: () => ({type: 'LOGOUT_SUCCESS'}),
  logout: () => async (dispatch) => {
    return UserService.setExpoToken('')
      .then(async () => {
        dispatch(userActions.logoutSuccess());
      })
      .catch(e => {
        console.log('-----> ', e);
      })
      .finally(async () => {
        await asyncStorage.removeItem('accessToken');
      })
  },

  setExpoTokenSuccess: () => ({type: 'SET_EXPO_TOKEN_SUCCESS'}),
  setExpoToken: expoToken => async (dispatch) => {
    return UserService.setExpoToken(expoToken)
      .then(() => {
        dispatch(userActions.setExpoTokenSuccess())
      })
      .catch(e => {
        console.log('-----> ', e);
      })
  },
};

export default userActions;
