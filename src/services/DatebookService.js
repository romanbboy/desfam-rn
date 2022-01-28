import api from './api'

export default {
  async add(form){
    return await api().post('datebooks/add', form);
  },
  async getPersonal(){
    return await api().get('datebooks/personal');
  },
  async getAll(){
    return await api().get('datebooks/getAll');
  },
  async get(id){
    return await api().get(`datebooks/${id}`);
  },
  async escape(datebook){
    return await api().get(`datebooks/${datebook.id}/escape`);
  },
  async deleteParticipant({datebook, participant}){
    return await api().delete(`datebooks/${datebook.id}/delete/participant/${participant.id}`);
  },
  async deleteDatebook(datebook){
    return await api().delete(`datebooks/${datebook.id}`);
  }
}
