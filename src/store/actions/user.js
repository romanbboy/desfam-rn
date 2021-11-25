import UserService from "../../services/UserService";

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
    localStorage.removeItem('accessToken');
    dispatch(userActions.logoutSuccess());
  },
};

export default userActions;