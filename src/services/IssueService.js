import api from './api'

export default {
  async add(issueRequest){
    return await api().post('/issues', issueRequest);
  },

}
