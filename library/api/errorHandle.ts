import { AxiosError, AxiosResponse } from 'axios';

export const handleHTTPError = (error: AxiosError) => {
  const { status, data } = error.response as AxiosResponse;
  if (status < 500) {
    console.log(error);
  }
  if (status >= 500) {
    console.log(error);
  }
  return Promise.reject(error);
};
