import authActions from "./auth";
import userActions from './user'
import datebookActions from './datebook'
import invitationActions from "./invitation";
import issueActions from "./issue";
import noteActions from "./note";

const actions = {
  ...authActions,
  ...userActions,
  ...datebookActions,
  ...invitationActions,
  ...issueActions,
  ...noteActions
};

export default actions;
