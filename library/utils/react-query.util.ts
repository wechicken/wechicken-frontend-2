import { AxiosResponse } from 'axios';

/**
 * react-query의 useQuery, useMutation등 훅의 query function에 사용하는 함수
 * @param config axios 요청
 * @returns axios response의 data 필드
 * @example
 * const {data, isLoading} = useQuery('SomeToken', fetchApi(axios.get('url')))
 */
export const fetchApi = (config: Promise<AxiosResponse>) => {
  return config.then(res => res.data);
};
