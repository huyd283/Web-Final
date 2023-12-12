import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';

import { ADMIN_STORE, DEFAULT_ADMIN_STATE } from '@/constants/admin';
import { DEFAULT_AUTHEN_STATE } from '@/constants/authentication';
import { adminLogin } from '@/services/adminApi';

const adminStore = createSlice({
  name: ADMIN_STORE,
  initialState: DEFAULT_ADMIN_STATE,
  reducers: {
    clear: () => {
      return DEFAULT_AUTHEN_STATE;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(adminLoginAction.pending, (state: any, _action) => {
        state.loading = true;
      })
      .addCase(adminLoginAction.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
      })
      .addCase(adminLoginAction.rejected, (state, _action) => {
        state.loading = false;
      });
  }
});

// redux thunk

export const adminLoginAction = createAsyncThunk(
  `${ADMIN_STORE}/login`,
  async (
    {
      username,
      password
    }: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const authenRes = await adminLogin(username, password);
    const checkErrCode = get(authenRes, 'status');
    if (checkErrCode && checkErrCode !== 200) {
      return rejectWithValue(authenRes);
    }
    return authenRes.data;
  }
);

const adminActions = adminStore.actions;
const adminReducer = adminStore.reducer;

export { adminActions, adminReducer };
