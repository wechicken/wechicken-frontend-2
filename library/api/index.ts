import { apiClient } from 'library/api/apiClient';
import { POSTS_LIMIT } from 'library/constants/constants';

export const getMainPage = (page: number) => {
  return apiClient.get(`/main?page=${page}&size=${POSTS_LIMIT}`);
};
