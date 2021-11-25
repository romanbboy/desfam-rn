import api from './api'

export default {
  async add(form){
    return await api().post('datebooks/add', form);
  },
  async getAll(){
    return await api().get('datebooks/getAll');
  },
  async get(id){
    return await api().get(`datebooks/${id}`);
  },
}