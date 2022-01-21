import {ADD_DATEBOOK_SUCCESS, GET_ALL_DATEBOOKS_SUCCESS} from "../constants";

const defaultState = {
  datebookList: null,
  invitations: []
}

export const mainReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type){
    case ADD_DATEBOOK_SUCCESS:
      return {
        ...state,
        datebookList: [...state.datebookList, payload]
      }

    case GET_ALL_DATEBOOKS_SUCCESS:
      return {...state, datebookList: payload}

    case 'ESCAPE_DATEBOOK_SUCCESS':
      return {
        ...state,
        datebookList: [...state.datebookList].filter(el => el.id !== payload.datebook.id)
      }

    case 'DELETE_DATEBOOK_SUCCESS':
      return {
        ...state,
        datebookList: [...state.datebookList].filter(el => el.id !== payload.datebook.id)
      }

    case 'GET_ALL_INVITATIONS_SUCCESS':
      return {...state, invitations: payload}

    case 'ACCEPT_INVITATION_SUCCESS':
      return {
        ...state,
        datebookList: [...state.datebookList, payload.datebook],
        invitations: [...state.invitations].filter(el => el.id !== payload.invitation.id),
      }

    case 'REJECT_INVITATION_SUCCESS':
      return {
        ...state,
        invitations: [...state.invitations].filter(el => el.id !== payload.invitation.id)
      }

    default:
      return state
  }
}
