import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import api from './apiConfig';

export const getTipsByUser = createAsyncThunk('tips/getTipsByUser', async ({ queryParams }, thunkAPI) => {
  try {
    const response = await api.get('tip', { params: { ...queryParams } });
    return response.data.tips;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const tipsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date)
  selectId: (tip) => tip.txHash,
});

const tipsSlice = createSlice({
  name: 'tips',
  initialState: {
    data: tipsAdapter.getInitialState([]),
    error: null,
    loading: true,
  },
  reducers: {
    // search: (state) => {
    //     // state.user = null;
    // },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTipsByUser.fulfilled, (state, action) => {
      tipsAdapter.setAll(state.data, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getTipsByUser.rejected, (state, action) => {
      console.log({ state, action });
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export const { resetError } = tipsSlice.actions;

export const tipsSelectors = tipsAdapter.getSelectors((state) => {
  return state.tips.data;
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
