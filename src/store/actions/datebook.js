import DatebookService from "../../services/DatebookService";

const datebookActions = {
  addDatebookSuccess: (payload) => ({type: 'ADD_DATEBOOK_SUCCESS', payload}),
  addDatebook: (form) => async (dispatch) => {
    return DatebookService.add(form)
      .then(res => {
        dispatch(datebookActions.addDatebookSuccess(res.data));
      })
  },

  getAllDatebooksSuccess: (payload) => ({type: 'GET_ALL_DATEBOOKS_SUCCESS', payload}),
  getAllDatebooks: () => async (dispatch) => {
    return DatebookService.getAll()
      .then(res => {
        dispatch(datebookActions.getAllDatebooksSuccess(res.data));
      })
  },

  getDatebookSuccess: (payload) => ({type: 'GET_DATEBOOK_SUCCESS', payload}),
  getDatebook: (id) => async (dispatch) => {
    return DatebookService.get(id)
      .then(res => {
        dispatch(datebookActions.getDatebookSuccess(res.data));
      })
  },

  escapeDatebookSuccess: payload => ({type: 'ESCAPE_DATEBOOK_SUCCESS', payload}),
  escapeDatebook: (datebook) => async (dispatch) => {
    return DatebookService.escape(datebook)
      .then(() => {
        dispatch(datebookActions.escapeDatebookSuccess({datebook}));
      })
  },
}

export default datebookActions;
