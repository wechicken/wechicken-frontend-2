import { AxiosResponse } from 'axios';
import { apiClient } from 'library/api/apiClient';
import { Obj } from 'library/models';
import { MyProfileData, MyPostData } from 'library/models/myprofile';

export const getMyProfile = (token?: string): Promise<AxiosResponse<MyProfileData>> => {
  return apiClient.get('/mypage', {
    headers: { Authorization: token },
  });
};

export const getMyPost = (token?: string): Promise<AxiosResponse<MyPostData>> => {
  return apiClient.get('/mypage/posts', {
    headers: { Authorization: token },
  });
};

export const deleteProfileImage = (params: {
  [key: string]: string;
}): Promise<AxiosResponse<Obj>> => {
  return apiClient.delete(`/mypage?deleted=${params.deleteTarget}`, {
    headers: { Authorization: params.token },
  });
};

export const deleteMyPost = (deletePostId: number, token: string) => {
  return apiClient.delete(`/mypage/post/${deletePostId}`, {
    headers: { Authorization: token },
  });
};

export const modifyProfileImage = (
  formData: FormData,
  token: string,
): Promise<AxiosResponse<Obj>> => {
  return apiClient.post('/mypage', formData, {
    headers: { Authorization: token, 'content-type': 'multipart/form-data' },
  });
};

export const modifyBlogUrl = (params: { [key: string]: string }): Promise<AxiosResponse<Obj>> => {
  return apiClient.post(
    '/mypage',
    { blog_address: params.blog_address },
    {
      headers: { Authorization: params.token },
    },
  );
};

export const modifyPost = (
  postId: number,
  title: string,
  link: string,
  date: string,
  token: string,
): Promise<AxiosResponse<Obj>> => {
  return apiClient.put(
    `/mypage/post/${postId}`,
    { title, link, date },
    {
      headers: { Authorization: token },
    },
  );
};
