import api from './api'

export default {
  async add(issueRequest){
    return await api().post('/issues', issueRequest);
  },
  async get(data){
    return await api().post(`/issues/get`, data);
  },
  async status(issue){
    return await api().put(`/issues/${issue.id}/status`, null);
  },
  async delete(issue){
    return await api().delete(`/issues/${issue.id}`);
  }
}
