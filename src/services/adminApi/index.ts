import type { AdminState } from '@/constants/admin';
import { API_URL } from '@/constants/apiUrl';
import { http } from '@/services/axiosInstances';

export const adminLogin = async (username: string, password: string) => {
  const payload = {
    username,
    password
  };

  return http.post<AdminState>(API_URL.ADMIN_LOGIN, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
