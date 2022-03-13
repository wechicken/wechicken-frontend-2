import { AxiosResponse } from 'axios';
import { GroupByDate, MyGroup } from 'components/myGroup/myGroup.model';
import { Obj } from 'library/models';
import { BatchesContribution, BatchesRank } from 'library/models/batch';
import { apiClient } from './apiClient';

export const getMyGroup = (): Promise<MyGroup> => {
  return apiClient.get<MyGroup>(`/mygroup`).then(res => res.data);
};

export const getPostsByDate = (date: string): Promise<GroupByDate> => {
  return apiClient.get<GroupByDate>(`/mygroup/calendar/:${date}`).then(res => res.data);
};

export const createPost = (body: Obj): Promise<AxiosResponse<MyGroup>> => {
  return apiClient.post<MyGroup>(`/mygroup/addpost`, body);
};

export const joinGroup = (): Promise<AxiosResponse<Obj>> => {
  return apiClient.post(`/mygroup/join`);
};

export const getBatchRank = async (batchId: string | number): Promise<BatchesRank[]> => {
  return apiClient.get(`/batches/${batchId}/ranks`).then(res => res.data.data);
};

export const getBatchContribution = (
  batchId: string | number,
  selectedDate: string,
): Promise<BatchesContribution[]> => {
  return apiClient
    .get(`/batches/${batchId}/week/users/contribution`, {
      params: { selected_date: selectedDate },
    })
    .then(res => res.data.data);
};
