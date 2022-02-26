import { MockAuth } from 'library/models';
import { apiClient } from './apiClient';

export const getMockLogin = async (gmail: string): Promise<MockAuth> => {
  return apiClient.post(`/users/test/login`, { gmail }).then(res => res.data);
};
