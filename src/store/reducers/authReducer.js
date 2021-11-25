import {REGISTRATION_SUCCESS, LOGIN_SUCCESS, GET_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_SUCCESS, LOGOUT_SUCCESS} from "../constants";

const defaultState = {
  currentUser: null,
}

export const authReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type){
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        currentUser: {...payload, accessToken: payload.accessToken},
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...payload,
          accessToken: payload.accessToken
        },
      }

    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...payload,
          accessToken: payload.accessToken
        },
      }

    case UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...payload,
          accessToken: payload.accessToken
        },
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      }

    default:
      return state
  }
}
