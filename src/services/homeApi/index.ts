import { API_URL } from '@/constants/apiUrl';
import { http } from '@/services/axiosInstances';
import type { INewsList } from '@/types/homeTypes';

export const getListNews = async () => {
  return http.get<INewsList>(API_URL.NEWS, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
