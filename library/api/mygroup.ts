import { GroupByDate, MyGroup } from 'components/myGroup/myGroup.model';
import { API_URL, TEST_TOKEN } from 'library/constants';
import { apiClient } from './apiClient';

export const getMyGroup = (): Promise<MyGroup> => {
  return apiClient
    .get<MyGroup>(`${API_URL}/mygroup`, { headers: { Authorization: TEST_TOKEN } })
    .then(res => res.data);
};

export const getPostsByDate = (date: string): Promise<GroupByDate> => {
  return apiClient
    .get<GroupByDate>(`${API_URL}/mygroup/calendar/:${date}`, {
      headers: {
        Authorization: TEST_TOKEN,
      },
    })
    .then(res => res.data);
};
