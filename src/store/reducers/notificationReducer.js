const defaultState = {
  notifications: null
}

export const notificationReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type){
    case 'GET_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        notifications: payload.notifications
      }

    case 'ADD_NOTE_SUCCESS':
      return {
        ...state,
        notifications: [payload.note, ...state.notifications]
      }

    case 'DELETE_NOTE_SUCCESS':
      return {
        ...state,
        notifications: [...state.notifications].filter(el => el.id !== payload.note.id)
      }

    default:
      return state
  }
}
