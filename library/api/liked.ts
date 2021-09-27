import { apiClient } from './apiClient';
import { Page } from 'library/models';

export const getLikedPost = (selectedMenu: string): Promise<Page> => {
  return apiClient.get(`/posts/${selectedMenu}`).then(res => res.data);
};
