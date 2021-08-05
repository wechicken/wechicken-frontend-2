import axios, { AxiosError } from 'axios';
import { API_URL } from 'library/constants/config.const';
import { handleHTTPError } from 'library/api/errorHandle';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  (error: AxiosError) => {
    return handleHTTPError(error as AxiosError);
  },
);
