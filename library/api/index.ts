import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { POSTS_LIMIT } from 'library/constants/constants';
import { CreatedUser, LoginUser, Page, MyProfile } from 'library/models';

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

export const getMyProfile = (token?: string): Promise<AxiosResponse<MyProfile>> => {
  return apiClient.get('/mypage', {
    headers: { Authorization: token },
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
