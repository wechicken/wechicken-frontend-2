import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { POSTS_LIMIT, SEARCH_RESULTS_LIMIT } from 'library/constants/constants';
import { CreatedUser, LoginUser, Page } from 'library/models';
export * from './mygroup';
export * from './myprofile';
export * from './auth';

export const getMainPage = (page: number): Promise<AxiosResponse<Page>> => {
  return apiClient.get(`/blogs?offset=${page}&limit=${POSTS_LIMIT}`);
};

export const postGoogleLogin = (googleToken: string): Promise<AxiosResponse<LoginUser>> => {
  return apiClient.post('/users/login/google', { googleToken });
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
  return apiClient.post(`/blogs/${id}/${type}`);
};

export const getSearch = (query: string, page: number): Promise<AxiosResponse<Page>> => {
  return apiClient.get(`/blogs?blogTitle=${query}&offset=${page}&limit=${SEARCH_RESULTS_LIMIT}`);
};

export const postCreateOrModifyGroup = (
  title: string,
  count: string,
  penalty: string,
): Promise<AxiosResponse<unknown>> => {
  return apiClient.post('/mygroup/createOrModifyMyGroup', { title, count, penalty });
};
