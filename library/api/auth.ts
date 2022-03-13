import { LoginUser } from 'library/models';
import { apiClient } from './apiClient';

export const getMockLogin = async (gmail: string): Promise<LoginUser> => {
  return apiClient.post(`/users/test/login`, { gmail }).then(res => res.data.data);
};
