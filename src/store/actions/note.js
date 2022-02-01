import NoteService from "../../services/NoteService";

const noteActions = {
  getNotificationsSuccess: payload => ({type: 'GET_NOTIFICATIONS_SUCCESS', payload}),
  getNotifications: () => async (dispatch) => {
    return NoteService.get()
      .then(res => dispatch(noteActions.getNotificationsSuccess({notifications: res.data.notifications})))
  },

  addNoteSuccess: payload => ({type: 'ADD_NOTE_SUCCESS', payload}),
  addNote: (note) => async (dispatch) => {
    return NoteService.add(note)
      .then(res => {
        dispatch(noteActions.addNoteSuccess({note: res.data.notification}))
      })
  },

  deleteNoteSuccess: payload => ({type: 'DELETE_NOTE_SUCCESS', payload}),
  deleteNote: note => async (dispatch) => {
    return NoteService.delete(note)
      .then(() => {
        dispatch(noteActions.deleteNoteSuccess({note}))
      })
  },
}

export default noteActions;
