import { AxiosResponse } from 'axios';
import { GroupByDate, MyGroup } from 'components/myGroup/myGroup.model';
import { Obj } from 'library/models';
import { apiClient } from './apiClient';

export const getMyGroup = (token = ''): Promise<MyGroup> => {
  return apiClient
    .get<MyGroup>(`/mygroup`, { headers: { Authorization: token } })
    .then(res => res.data);
};

export const getPostsByDate = (date: string, token = ''): Promise<GroupByDate> => {
  return apiClient
    .get<GroupByDate>(`/mygroup/calendar/:${date}`, {
      headers: {
        Authorization: token,
      },
    })
    .then(res => res.data);
};

export const createPost = (body: Obj, token = ''): Promise<AxiosResponse<MyGroup>> => {
  return apiClient.post<MyGroup>(`/mygroup/addpost`, body, {
    headers: { Authorization: token },
  });
};

export const joinGroup = (token = ''): Promise<AxiosResponse<Obj>> => {
  return apiClient.post(`/mygroup/join`, {}, { headers: { Authorization: token } });
};
