import IssueService from "../../services/IssueService";

const issueActions = {
  addIssueSuccess: payload => ({type: 'ADD_ISSUE_SUCCESS', payload}),
  addIssue: (issueRequest) => async (dispatch) => {
    return IssueService.add(issueRequest)
  },

  changeStatusIssueSuccess: payload => ({type: 'CHANGE_STATUS_ISSUE_SUCCESS', payload}),
  changeStatusIssue: (issue) => async (dispatch) => {
    return IssueService.status(issue)
      .then(res => {
        dispatch(issueActions.changeStatusIssueSuccess({issue: res.data}))
      })
  },

  deleteIssueSuccess: payload => ({type: 'DELETE_ISSUE_SUCCESS', payload}),
  deleteIssue: (issue) => async (dispatch) => {
    return IssueService.delete(issue)
      .then(() => {
        dispatch(issueActions.deleteIssueSuccess({issue}))
      })
  },
}

export default issueActions;
