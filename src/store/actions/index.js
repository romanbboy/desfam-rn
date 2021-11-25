import authActions from "./auth";
import userActions from './user'
import datebookActions from './datebook'

const actions = {
  ...authActions,
  ...userActions,
  ...datebookActions
};

export default actions;