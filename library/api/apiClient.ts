import axios, { AxiosError } from 'axios';
import cloneDeep from 'lodash-es/cloneDeep';
import { handleHTTPError } from 'library/api/errorHandle';
import { API_URL } from 'library/constants/config.const';

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
    return response;
  },
  (error: AxiosError) => {
    return handleHTTPError(error as AxiosError);
  },
);

apiClient.interceptors.request.use(req => {
  const request = cloneDeep(req);

  request.headers = {
    ...req.headers,
    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('USER') ?? '{}').token ?? ''}`,
  };

  return request;
});
