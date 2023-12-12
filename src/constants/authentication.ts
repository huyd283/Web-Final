export const DEFAULT_AUTHEN_STATE = {
  accessToken: '',
  loading: false,
  products: [],
  user: {
    id: 0,
    user_name: '',
    displayName: '',
    balance: 0,
    isActivate: false,
    roles: ''
  },
  userInfo: {
    user_id: 0,
    user_name: '',
    email: '',
    telephone: '',
    address: '',
    balance: 0,
    isActive: false,
    created_at: '',
    fullname: ''
  },
  qrCode: { qrCode: '', qrDataURL: '' },
  transactions: []
};

export const AUTHEN_STORE = 'authen';
