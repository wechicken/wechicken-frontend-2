import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { POSTS_LIMIT, SEARCH_RESULTS_LIMIT } from 'library/constants/constants';
import { CreatedUser, LoginUser, Page } from 'library/models';
export * from './mygroup';
export * from './myprofile';

export const getMainPage = (page: number): Promise<AxiosResponse<Page>> => {
  return apiClient.get(`/main?page=${page}&size=${POSTS_LIMIT}`);
};

export const postGoogleLogin = (googleToken: string): Promise<AxiosResponse<LoginUser>> => {
  return apiClient.post('/auth/login/google', { googleToken });
};

export const postAuthAddtional = (formData: FormData): Promise<AxiosResponse<CreatedUser>> => {
  return apiClient.post('/auth/additional', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const postLikeStatus = (
  type: string,
  id: number,
): Promise<AxiosResponse<{ message: string }>> => {
  return apiClient.post(`/posts/${type}/${id}`);
};

export const getSearch = (query: string, page: number): Promise<AxiosResponse<Page>> => {
  return apiClient.get(`/search?keyword=${query}&page=${page}&size=${SEARCH_RESULTS_LIMIT}`);
};

export const postCreateOrModifyGroup = (
  title: string,
  count: string,
  penalty: string,
): Promise<AxiosResponse<any>> => {
  return apiClient.post('/mygroup/createOrModifyMyGroup', { title, count, penalty });
};
