import { apiClient } from 'library/api/apiClient';
import { POSTS_LIMIT } from 'library/constants/constants';

export const getMainPage = (page: number) => {
  return apiClient.get(`/main?page=${page}&size=${POSTS_LIMIT}`);
};

export const postGoogleLogin = (googleToken: string) => {
  return apiClient.post('/auth/login/google', { googleToken });
};

export const postAuthAddtional = (formData: FormData) => {
  return apiClient.post('/auth/additional', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
