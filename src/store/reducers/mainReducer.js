import {ADD_DATEBOOK_SUCCESS, GET_ALL_DATEBOOKS_SUCCESS} from "../constants";

const defaultState = {
  datebookList: []
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

    default:
      return state
  }
}