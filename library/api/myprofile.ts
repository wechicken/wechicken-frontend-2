import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { Obj } from 'library/models';
import { UserInfo } from 'library/models/auth';
import { Page } from 'library/models/main';

export const getMyProfile = (): Promise<UserInfo> => {
  return apiClient.get('/users').then(res => res.data.data);
};

export const getMyPost = (): Promise<Page> => {
  return apiClient.get('/users/blogs?offset=0&limit=20').then(res => res.data);
};

export const deleteProfileImage = (deleteTarget: string): Promise<AxiosResponse<Obj>> => {
  return apiClient.delete(`/mypage?deleted=${deleteTarget}`);
};

export const deleteMyPost = (deletePostId: number): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`/mypage/post/${deletePostId}`);
};

export const modifyProfileImage = (formData: FormData): Promise<AxiosResponse<Obj>> => {
  return apiClient.post('/mypage', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const modifyBlogUrl = (blog_address: string): Promise<AxiosResponse<Obj>> => {
  return apiClient.post('/mypage', { blog_address });
};

export const modifyPost = ({
  postId,
  title,
  link,
  date,
}: {
  postId: number;
  title: string;
  link: string;
  date: string;
}): Promise<AxiosResponse<Obj>> => {
  return apiClient.put(`/mypage/post/${postId}`, { title, link, date });
};
