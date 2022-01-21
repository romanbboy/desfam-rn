import DatebookService from "../../services/DatebookService";
import IssueService from "../../services/IssueService";

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

  deleteParticipantSuccess: payload => ({type: 'DELETE_PARTICIPANT_SUCCESS', payload}),
  deleteParticipant: ({datebook, participant}) => async (dispatch) => {
    return DatebookService.deleteParticipant({datebook, participant})
      .then(() => {
        dispatch(datebookActions.deleteParticipantSuccess({participant}));
      })
  },

  getDatebookIssuesSuccess: payload => ({type: 'GET_DATEBOOK_ISSUES_SUCCESS', payload}),
  getDatebookIssues: (data) => async (dispatch) => {
    return IssueService.get(data)
      .then(res => {
        dispatch(datebookActions.getDatebookIssuesSuccess({issues: res.data}));
      })
  },

  deleteDatebookSuccess: payload => ({type: 'DELETE_DATEBOOK_SUCCESS', payload}),
  deleteDatebook: datebook => async (dispatch) => {
    return DatebookService.deleteDatebook(datebook)
      .then(() => {
        dispatch(datebookActions.deleteDatebookSuccess({datebook}));
      })
  },
};

export default datebookActions;
