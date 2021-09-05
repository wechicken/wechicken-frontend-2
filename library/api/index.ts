import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { POSTS_LIMIT, SEARCH_RESULTS_LIMIT } from 'library/constants/constants';
import { CreatedUser, LoginUser, Page } from 'library/models';
export * from './mygroup';

export const getMainPage = (page: number, token?: string): Promise<AxiosResponse<Page>> => {
  return apiClient.get(`/main?page=${page}&size=${POSTS_LIMIT}`, {
    headers: { Authorization: token },
  });
};

export const postGoogleLogin = (googleToken: string): Promise<AxiosResponse<LoginUser>> => {
  return apiClient.post('/auth/login/google', { googleToken });
};

export const postAuthAddtional = (formData: FormData): Promise<AxiosResponse<CreatedUser>> => {
  return apiClient.post('/auth/additional', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// TODO 토큰 쿠키 작성 전까지 임시로 토큰 넣습니다..
export const postLikeStatus = (
  type: string,
  id: number,
  token: string,
): Promise<AxiosResponse<{ message: string }>> => {
  return apiClient.post(`/posts/${type}/${id}`, {}, { headers: { Authorization: token } });
};

export const getSearch = (
  query: string,
  page: number,
  token?: string,
): Promise<AxiosResponse<Page>> => {
  return apiClient.get(`/search?keyword=${query}&page=${page}&size=${SEARCH_RESULTS_LIMIT}`, {
    headers: { Authorization: token },
  });
};

export const postCreateOrModifyGroup = (
  title: string,
  count: string,
  penalty: string,
  token?: string,
  // TODO response type 확인 후 정의 필요
): Promise<AxiosResponse<any>> => {
  return apiClient.post(
    '/mygroup/createOrModifyMyGroup',
    { title, count, penalty },
    {
      headers: { Authorization: token },
    },
  );
};
