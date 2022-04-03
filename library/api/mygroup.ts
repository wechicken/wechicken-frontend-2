import { AxiosResponse } from 'axios';
import { Obj } from 'library/models';
import {
  BatchesByWeek,
  BatchesContribution,
  BatchesRank,
  PostEditorInput,
  MyGroup,
} from 'library/models';
import { apiClient } from './apiClient';

export const getMyGroup = (): Promise<MyGroup> => {
  return apiClient.get<MyGroup>(`/mygroup`).then(res => res.data);
};

export const createPost = (body: PostEditorInput): Promise<AxiosResponse<MyGroup>> => {
  return apiClient.post<MyGroup>(`/blogs`, body);
};

/**
 *
 * @deprecated
 */
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

export const getBatchPostsByDate = (
  batchId: string | number,
  selectdDate: string,
): Promise<BatchesByWeek> => {
  return apiClient
    .get(`/batches/${batchId}/week/blogs`, {
      params: { selected_date: selectdDate },
    })
    .then(res => res.data.data);
};
