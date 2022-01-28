import IssueService from "../../services/IssueService";

const issueActions = {
  addPersonalIssueSuccess: payload => ({type: 'ADD_PERSONAL_ISSUE_SUCCESS', payload}),
  addIssueSuccess: payload => ({type: 'ADD_ISSUE_SUCCESS', payload}),
  addIssue: (issueRequest) => async (dispatch) => {
    return IssueService.add(issueRequest)
  },

  changeStatusPersonalIssueSuccess: payload => ({type: 'CHANGE_STATUS_PERSONAL_ISSUE_SUCCESS', payload}),
  changeStatusIssueSuccess: payload => ({type: 'CHANGE_STATUS_ISSUE_SUCCESS', payload}),
  changeStatusIssue: (issue, type) => async (dispatch) => {
    return IssueService.status(issue)
      .then(res => {
        dispatch(
          type === 'personal'
            ? issueActions.changeStatusPersonalIssueSuccess({issue: res.data})
            : issueActions.changeStatusIssueSuccess({issue: res.data})
        );
      })
  },

  deletePersonalIssueSuccess: payload => ({type: 'DELETE_PERSONAL_ISSUE_SUCCESS', payload}),
  deleteIssueSuccess: payload => ({type: 'DELETE_ISSUE_SUCCESS', payload}),
  deleteIssue: (issue, type) => async (dispatch) => {
    return IssueService.delete(issue)
      .then(() => {
        dispatch(
          type === 'personal'
            ? issueActions.deletePersonalIssueSuccess({issue})
            : issueActions.deleteIssueSuccess({issue})
        )
      })
  },
}

export default issueActions;
