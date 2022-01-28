import {ADD_DATEBOOK_SUCCESS, GET_ALL_DATEBOOKS_SUCCESS} from "../constants";

const defaultState = {
  datebookList: null,
  invitations: [],
  personalDatebook: null
}

export const mainReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type){
    case 'GET_PERSONAL_DATEBOOK_SUCCESS':
      return {
        ...state,
        personalDatebook: payload.personalDatebook
      }

    case 'ADD_PERSONAL_ISSUE_SUCCESS':
      return {
        ...state,
        personalDatebook: {
          ...state.personalDatebook,
          issues: [...state.personalDatebook.issues, payload.issue]
        }
      }

    case 'CHANGE_STATUS_PERSONAL_ISSUE_SUCCESS':
      return {
        ...state,
        personalDatebook: {
          ...state.personalDatebook,
          issues: [...state.personalDatebook.issues].map(el => {
            let issue = {...el};
            if (issue.id === payload.issue.id) issue.status = payload.issue.status;
            return issue;
          })
        }
      }

    case 'DELETE_PERSONAL_ISSUE_SUCCESS':
      return {
        ...state,
        personalDatebook: {
          ...state.personalDatebook,
          issues: [...state.personalDatebook.issues].filter(el => el.id !== payload.issue.id)
        }
      }

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
