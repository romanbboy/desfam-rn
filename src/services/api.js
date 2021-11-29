import axios from 'axios'
import asyncStorage from "../utils/asyncStorage";

export default () => {
  // Перед продом заменить на https:// сервер с ssl сертификатом!
  const baseURL = 'http://10.0.0.135/api';

  const instance = axios.create({baseURL});

  instance.interceptors.request.use(async (config) => {
    const accessToken = await asyncStorage.getData('accessToken');
    config.headers.Authorization = accessToken ? `Token ${accessToken}` : '';
    return config;
  });

  return instance
}
