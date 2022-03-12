import { Page } from 'library/models';
import { apiClient } from './apiClient';

export const getLikedPost = (selectedMenu: string): Promise<Page> => {
  return apiClient.get(`/blogs/${selectedMenu}`).then(res => res.data);
};
