import { AxiosError, AxiosResponse } from 'axios';

export const handleHTTPError = (error: AxiosError): Promise<never> => {
  const { status } = (error.response as AxiosResponse) || 500;
  if (status < 500) {
    console.log(status, error);
  }
  if (status >= 500) {
    console.log(status, error);
  }
  return Promise.reject(error);
};
