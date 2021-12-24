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
    await asyncStorage.removeItem('accessToken');
    dispatch(userActions.logoutSuccess());
  },

  setExpoTokenSuccess: () => ({type: 'SET_EXPO_TOKEN_SUCCESS'}),
  setExpoToken: expoToken => async (dispatch) => {
    return UserService.setExpoToken(expoToken)
      .then(() => {
        dispatch(userActions.setExpoTokenSuccess())
      })
  },
};

export default userActions;
