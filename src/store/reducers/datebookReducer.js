import {GET_DATEBOOK_SUCCESS} from "../constants";

const defaultState = {
  info: null
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

    default:
      return state
  }
}
