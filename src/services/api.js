import axios from 'axios'

export default () => {
  const baseURL = 'http://romanbef.bget.ru/api';

  const instance = axios.create({baseURL});

  instance.interceptors.request.use(function (config) {
    /*const accessToken = localStorage.getItem('accessToken')
    config.headers.Authorization = accessToken ? `Token ${accessToken}` : '';*/
    return config;
  });

  return instance
}
