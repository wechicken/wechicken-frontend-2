import { AxiosError, AxiosResponse } from 'axios';

export const handleHTTPError = (error: AxiosError) => {
  const { status } = error.response as AxiosResponse;
  if (status < 500) {
    console.log(status, error);
  }
  if (status >= 500) {
    console.log(status, error);
  }
  return Promise.reject(error);
};
