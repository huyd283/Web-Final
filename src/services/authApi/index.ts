import { API_URL } from '@/constants/apiUrl';
import { http } from '@/services/axiosInstances';
import { store } from '@/stores';
import type {
  AuthenState,
  IBuyProduct,
  IGenQR,
  IProductList,
  ITransaction,
  IUserInfo
} from '@/types/authTypes';
import type { IUser } from '@/types/user';

export const register = async (payload: IUser) => {
  return http.post<AuthenState>(API_URL.REGISTER, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
export const login = async (username: string, password: string) => {
  const payload = {
    username,
    password
  };

  return http.post<AuthenState>(API_URL.LOGIN, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const logout = async () => {
  return http.get<AuthenState>(API_URL.LOGOUT, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getProducts = async () => {
  return http.get<IProductList>(API_URL.PRODUCT_LIST, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
export const buyProduct = async (id: string) => {
  const payload = {
    id
  };
  const state = store.getState();
  const { accessToken } = state.authen;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };

  return http.post<IBuyProduct>(API_URL.BUY_ITEM, payload, {
    headers
  });
};

export const getQrCode = async () => {
  const state = store.getState();
  const { accessToken } = state.authen;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };
  return http.get<IGenQR>(API_URL.GEN_QR, {
    headers
  });
};

export const getTransaction = async () => {
  const state = store.getState();
  const { accessToken } = state.authen;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };
  return http.get<ITransaction>(API_URL.GET_TRANSACTION, {
    headers
  });
};
export const getUserInfo = async () => {
  const state = store.getState();
  const { accessToken } = state.authen;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };
  return http.get<IUserInfo>(API_URL.GET_USER_INFO, {
    headers
  });
};
