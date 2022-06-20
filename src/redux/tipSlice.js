import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import api from './apiConfig';

export const getTipsByUser = createAsyncThunk('tips/getTipsByUser', async (queryParams, thunkAPI) => {
  const state = thunkAPI.getState();
  // console.log(state.tips.pagination);
  console.log(state.tips.pagination.pages.hasOwnProperty(queryParams.page));

  if (!state.tips.pagination.pages.hasOwnProperty(queryParams.page)) {
    try {
      console.log('fetched');
      // console.log(state.tips.pagination.pages.hasOwnProperty(queryParams.page));
      const response = await api.get('tip', { params: { ...queryParams } });
      const ids = response.data.reduce((prev, curr) => [...prev, curr.txHash], []);
      // const ids = response.data.tips.reduce((prev, curr) => [...prev, curr.txHash], []).flat();
      // console.log(ids);
      return { tips: response.data, ids };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
  return;
});

const tipsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date)
  selectId: (tip) => tip.txHash,
});

const initialState = tipsAdapter.getInitialState({
  currentPage: 0,
  // fetchedPage: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    pages: {},
  },
  // elementsCount: 800,
});

const tipsSlice = createSlice({
  name: 'tips',
  initialState,
  reducers: {
    // search: (state) => {
    //     // state.user = null;
    // },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTipsByUser.pending, (state, arg) => {
      // console.log(arg.meta.arg.page);
      // state.pagination.pages[arg.meta.arg.page] = {
      //   isFetching: true,
      // };
      state.status = 'loading';
    });
    builder.addCase(getTipsByUser.fulfilled, (state, action, arg) => {
      console.log(action);
      // console.log(action.meta.arg.page);
      // console.log(arg);/
      // console.log(arg.meta.arg.page);
      tipsAdapter.upsertMany(state, action.payload.tips);
      state.currentPage = action.meta.arg.page;
      state.pagination.pages[action.meta.arg.page] = {
        // lastUpdateTime: 1516177824891,
        isFetching: false,
        ids: action.payload.ids,
      };
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(getTipsByUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.status = 'failed';
    });
  },
});

export const { resetError } = tipsSlice.actions;

export const tipsSelectors = tipsAdapter.getSelectors((state) => {
  return state.tips;
});

export default tipsSlice.reducer;

// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getTipsByUser: builder.query({
//       query: (queryParams) => ({
//         url: `/tip`,
//         params: {
//           // ...queryParams,
//         },
//       }),
//       transformResponse: (responseData) => {
//         // const sorted = responseData.sort(sortByDate);
//         // return sorted;
//         // return responseData.tips;
//         return tipsAdapter.setAll(initialState, responseData.tips);
//       },
//       providesTags: (result, error, arg) => {
//         // console.log(error)
//         // return [...result.map(({ txHash }) => ({ type: 'Tip', txHash }))];
//         return [...result.ids.map(({ txHash }) => ({ type: 'Tip', txHash }))];
//       },
//     }),
//     updateTip: builder.mutation({
//       query: (initialTip) => ({
//         url: `/tip/${initialPost.txHash}`,
//         method: 'PUT',
//         body: {
//           type: 'update',
//           data: { ...initialTip, date: new Date().toISOString() },
//         },
//       }),
//       invalidatesTags: (result, error, arg) => [{ type: 'Tip', id: arg.txHash }],
//     }),
//     setNotDisplayed: builder.mutation({
//       query: ({ tipTxHash, userWalletAddress }) => ({
//         url: `tip/${tipTxHash}`,
//         method: 'PATCH',
//         // In a real app, we'd probably need to base this on user ID somehow
//         // so that a user can't do the same reaction more than once
//         body: { type: 'unsetShowed', data: { tipTxHash } },
//       }),
//       async onQueryStarted({ txHash }, { dispatch, queryFulfilled }) {
//         // `updateQueryData` requires the endpoint name and cache key arguments,
//         // so it knows which piece of cache state to update
//         const patchResult = dispatch(
//           extendedApiSlice.util.updateQueryData('getTipsByUserWallet', userWalletAddress, (draft) => {
//             // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
//             const tip = draft.entities[txHash];
//             if (tip) tip.displayed = false;
//           }),
//         );
//         try {
//           await queryFulfilled;
//         } catch {
//           patchResult.undo();
//         }
//       },
//     }),
//   }),
// });

// const sortByDate = (a, b) => {
//   if (a.date < b.date) {
//     return 1;
//   }
//   if (a.date > b.date) {
//     return -1;
//   }
//   return 0;
// };
