import {GET_DATEBOOK_SUCCESS} from "../constants";

const defaultState = {
  info: null,
  issues: null
}

export const datebookReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type){
    case GET_DATEBOOK_SUCCESS:
      return {
        ...state,
        info: payload
      }

    case 'EXIT_DATEBOOK': return defaultState

    case 'DELETE_PARTICIPANT_SUCCESS':
      return {
        ...state,
        info: {
          ...state.info,
          participants: state.info.participants.filter(el => el.id !== payload.participant.id)
        }
      }

    case 'ADD_ISSUE_SUCCESS':
      return {...state, issues: [...state.issues, payload.issue]}

    case 'GET_DATEBOOK_ISSUES_SUCCESS':
      return {...state, issues: payload.issues}

    case 'CHANGE_STATUS_ISSUE_SUCCESS':
      return {
        ...state,
        issues: [...state.issues].map(el => {
          let issue = {...el};
          if (issue.id === payload.issue.id) issue.status = payload.issue.status;
          return issue;
        })
      }

    case 'DELETE_ISSUE_SUCCESS':
      return {
        ...state,
        issues: [...state.issues].filter(el => el.id !== payload.issue.id)
      }

    default:
      return state
  }
}
