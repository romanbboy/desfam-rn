import InvitationService from "../../services/InvitationService";

const invitationActions = {
  getAllInvitationsSuccess: (payload) => ({type: 'GET_ALL_INVITATIONS_SUCCESS', payload}),
  getAllInvitations: () => async (dispatch) => {
    return InvitationService.getAll()
      .then(res => {
        dispatch(invitationActions.getAllInvitationsSuccess(res.data));
      })
  },

  acceptInvitationSuccess: (payload) => ({type: 'ACCEPT_INVITATION_SUCCESS', payload}),
  acceptInvitation: (invitation) => async (dispatch) => {
    return InvitationService.accept(invitation)
      .then(res => {
        dispatch(invitationActions.acceptInvitationSuccess({datebook: res.data, invitation}));
      })
  },

  rejectInvitationSuccess: (payload) => ({type: 'REJECT_INVITATION_SUCCESS', payload}),
  rejectInvitation: (invitation) => async (dispatch) => {
    return InvitationService.reject(invitation)
      .then(() => {
        dispatch(invitationActions.rejectInvitationSuccess({invitation}));
      })
  },
}

export default invitationActions;
