import api from './api'

export default {
  async add(note){
    return await api().post('/notifications', {note});
  },
  async get(){
    return await api().get(`/notifications`);
  },
  async delete(note){
    return await api().delete(`/notifications/${note.id}`);
  }
}
