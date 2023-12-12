export const DEFAULT_ADMIN_STATE = {
  accessToken: '',
  loading: false,
  user: {
    id: 0,
    user_name: '',
    displayName: '',
    roles: ''
  }
};

export const ADMIN_STORE = 'admin';

export type AdminState = {
  accessToken: string;
  loading: boolean;
  user: {
    id: number;
    user_name: string;
    displayName: string;
    roles: string;
  };
};
