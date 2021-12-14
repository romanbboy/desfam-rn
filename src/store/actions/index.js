import authActions from "./auth";
import userActions from './user'
import datebookActions from './datebook'
import invitationActions from "./invitation";

const actions = {
  ...authActions,
  ...userActions,
  ...datebookActions,
  ...invitationActions,
};

export default actions;
