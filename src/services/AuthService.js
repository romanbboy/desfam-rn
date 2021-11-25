import api from './api'

export default {
  async registration(form){
    return await api().post('auth/registration', form);
  },
  async login(form){
    return await api().post('auth/login', form);
  }
}