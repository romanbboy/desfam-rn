import api from './api'

export default {
  async add(issueRequest){
    return await api().post('/issues', issueRequest);
  },
  async get(data){
    return await api().post(`/issues/get`, data);
  }
}
