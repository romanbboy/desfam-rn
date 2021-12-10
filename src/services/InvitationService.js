import api from './api'

export default {
  async add(invite){
    return await api().post('/invitations', invite);
  },
  async getAll(){
    return await api().get('/invitations');
  },
  async accept(invitation){
    return await api().get(`/invitations/${invitation.id}/accept`);
  },
  async reject(invitation){
    return await api().delete(`/invitations/${invitation.id}/reject`);
  },
}
