import axios from 'axios'
import asyncStorage from "../utils/asyncStorage";

export default () => {
  // Перед продом заменить на https:// сервер с ssl сертификатом!
  // const baseURL = 'http://192.168.0.198/api';
  const baseURL = 'https://desfam.ru/api';

  const instance = axios.create({baseURL});

  instance.interceptors.request.use(async (config) => {
    const accessToken = await asyncStorage.getData('accessToken');
    config.headers.Authorization = accessToken ? `Token ${accessToken}` : '';
    return config;
  });

  return instance
}
