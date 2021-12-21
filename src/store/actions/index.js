import authActions from "./auth";
import userActions from './user'
import datebookActions from './datebook'
import invitationActions from "./invitation";
import issueActions from "./issue";

const actions = {
  ...authActions,
  ...userActions,
  ...datebookActions,
  ...invitationActions,
  ...issueActions
};

export default actions;
