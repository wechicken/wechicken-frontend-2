import { AxiosResponse } from 'axios';
import { GroupByDate, MyGroup } from 'components/myGroup/myGroup.model';
import { TEST_TOKEN } from 'library/constants';
import { Obj } from 'library/models';
import { apiClient } from './apiClient';

export const getMyGroup = (): Promise<MyGroup> => {
  return apiClient
    .get<MyGroup>(`/mygroup`, { headers: { Authorization: TEST_TOKEN } })
    .then(res => res.data);
};

export const getPostsByDate = (date: string): Promise<GroupByDate> => {
  return apiClient
    .get<GroupByDate>(`/mygroup/calendar/:${date}`, {
      headers: {
        Authorization: TEST_TOKEN,
      },
    })
    .then(res => res.data);
};

export const createPost = (body: Obj): Promise<AxiosResponse<MyGroup>> => {
  return apiClient.post<MyGroup>(`/mygroup/addpost`, body, {
    headers: { Authorization: TEST_TOKEN },
  });
};
