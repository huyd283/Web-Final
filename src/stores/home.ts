import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';

import { DEFAULT_HOME_STATE, HOME_STORE } from '@/constants/home';
import { getListNews } from '@/services/homeApi';

const homeStore = createSlice({
  name: HOME_STORE,
  initialState: DEFAULT_HOME_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getNewsAction.fulfilled, (state: any, action) => {
      state.news = action.payload;
    });
  }
});

// redux thunk
export const getNewsAction = createAsyncThunk(`${HOME_STORE}/getNews`, async () => {
  const newRes = await getListNews();
  const checkErrCode = get(newRes, 'status');
  if (checkErrCode && checkErrCode !== 200) {
    return newRes;
  }
  return newRes.data;
});

const homeActions = homeStore.actions;
const homeReducer = homeStore.reducer;

export { homeActions, homeReducer };
