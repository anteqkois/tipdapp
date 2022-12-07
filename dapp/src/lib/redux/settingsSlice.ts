import {  AsyncStatus } from '@/types';
import { ApiError, ValidationError } from '@anteqkois/server';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSettingsByUser = createAsyncThunk(
  'settings/get',
  async (queryParams, thunkAPI) => {
    try {
      // const data = await api.get('tip', {
      //   params: { ...queryParams, pageSize: tips.pageSize },
      // });
      // const ids = data.tips.reduce((prev, curr) => [...prev, curr.txHash], []);
      // return { tips: data.tips, ids, amount: data.count };
      return { darkMode: true };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

type SliceState = {
  darkMode: boolean;
  status: AsyncStatus;
  error: [] | ApiError[] | ValidationError[];
};

const initialState: SliceState = {
  darkMode: false,
  status: 'idle',
  error: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSettingsByUser.pending, (state, arg) => {
      state.status = 'loading';
    });
    builder.addCase(getSettingsByUser.fulfilled, (state, action) => {
      state.error = [];
      state.status = 'success';
      // for (const key in action.payload) {
      //   if (Object.hasOwnProperty.call(action.payload, key)) {
      //     state[key] = action.payload[key];
      //   }
      // }
    });
    builder.addCase(getSettingsByUser.rejected, (state, action) => {
      // console.log(action);
      // if (action.payload?.[0]?.name === 'ApiError') {
      //   state.error = action.payload.userMessage;
      //   state.status = 'fail';
      // } else {
      //   state.error = 'Something went wrong';
      //   state.status = 'fail';
      // }
    });
  },
});

export const { resetError } = settingsSlice.actions;

// export const tipsSelectors = tipsAdapter.getSelectors((state) => {
//   return state.tips;
// });

// export const selectIdsPerPage = createSelector(
//   [(state) => state.tips.pagination, (state) => state.tips.currentPage],
//   (pagination, currentPage) => pagination?.pages[currentPage]?.ids ?? []
// );

// export const selectTipsPerPage = createSelector(
//   [(state) => state.tips.entities, selectIdsPerPage],
//   (entities, idsForPage) =>
//     idsForPage.reduce(
//       (previousValue, id) => [...previousValue, entities[id]],
//       []
//     )
// );

// export const selectCurrentData = createSelector(
//   [
//     (state) => state.tips.status,
//     (state) => state.tips.error,
//     selectTipsPerPage,
//   ],
//   (status, error, tips) => {
//     return { status, error, tips };
//   }
// );
// export const selectPageSize = createSelector(
//   [(state) => state.tips.pageSize],
//   (pageSize) => pageSize
// );

export default settingsSlice.reducer;
