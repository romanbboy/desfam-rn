import api from './api'

export default {
  async getCurrentUser(){
    return await api().get('users/current');
  },
  async updateCurrentUser(form){
    return await api().put('users/current', form, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  async findOne(field, val){
    return await api().post('/users/findOne', {field, val});
  },
  async setExpoToken(expoToken){
    return await api().put('/users/expoToken', {expoToken});
  },
}
