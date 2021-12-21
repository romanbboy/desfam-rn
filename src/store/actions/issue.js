import IssueService from "../../services/IssueService";

const issueActions = {
  addIssueSuccess: payload => ({type: 'ADD_ISSUE_SUCCESS', payload}),
  addIssue: (issueRequest) => async (dispatch) => {
    return IssueService.add(issueRequest)
  },
}

export default issueActions;
