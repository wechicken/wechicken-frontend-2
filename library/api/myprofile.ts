import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { Obj, LoginUser, Page } from 'library/models';

export const getMyProfile = (): Promise<LoginUser> => {
  return apiClient.get('/users').then(res => res.data.data);
};

export const getMyPost = (): Promise<Page> => {
  return apiClient.get('/users/blogs?offset=0&limit=20').then(res => res.data);
};

export const deleteProfileImage = (): Promise<AxiosResponse<Obj>> => {
  return apiClient.delete('/users/thumbnail');
};

export const deleteMyPost = (deletePostId: number): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`/blogs/${deletePostId}`);
};

export const modifyProfileImage = (formData: FormData): Promise<AxiosResponse<Obj>> => {
  return apiClient.patch('/users/thumbnail', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const modifyBlogUrl = (blog_address: string): Promise<AxiosResponse<Obj>> => {
  return apiClient.patch('/users/blog_address', { blog_address });
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
  return apiClient.put(`/blogs/${postId}`, { title, link, date });
};
