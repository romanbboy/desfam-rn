import axios from 'axios'
import asyncStorage from "../utils/asyncStorage";

export default () => {
  const baseURL = process.env.NODE_ENV === 'development'
    ? `${process.env.URL_DEVELOPMENT}:80/api`
    : `${process.env.URL_PRODUCTION}/api`;

  const instance = axios.create({baseURL});

  instance.interceptors.request.use(async (config) => {
    const accessToken = await asyncStorage.getData('accessToken');
    config.headers.Authorization = accessToken ? `Token ${accessToken}` : '';
    return config;
  });

  return instance
}
