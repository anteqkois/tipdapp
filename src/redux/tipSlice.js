import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';
import { apiSlice } from './apiSlice';

const tipsAdapter = createEntityAdapter({
  selectId: (tip) => tip.txHash,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = tipsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getTips: builder.query({
    //   query: () => '/tip',
    //   transformResponse: (responseData) => {
    //     return tipsAdapter.setAll(initialState, responseData);
    //   },
    //   // providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
    //   // providesTags: (result, error, arg) => (result ? [...result.map(({ id }) => ({ type: 'Tip', id })), 'Tip'] : ['Tip']),
    //   providesTags: (result, error, arg) =>
    //     result ? [...result.map(({ id }) => ({ type: 'Tip', id })), { type: 'Tip', id: 'LIST' }] : [{ type: 'Tip', id: 'LIST' }],
    // }),
    getTipsByUserWallet: builder.query({
      query: (walletAddress) => `/tip/walletAddress/${walletAddress}`,
      transformResponse: (responseData) => {
        return tipsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        console.log(result, arg);
        return [{ type: 'Tip', id: 'LIST' }];
        // return [...result.ids.map((txHash) => ({ type: 'Tip', id: txHash }))];
      },
      // providesTags: (result, error, arg) => [...result.ids.map((id) => ({ type: 'Tip', id }))],
    }),
    // addNewPost: builder.mutation({
    //   query: (initialPost) => ({
    //     url: '/posts',
    //     method: 'POST',
    //     body: {
    //       ...initialPost,
    //       userId: Number(initialPost.userId),
    //       date: new Date().toISOString(),
    //       reactions: {
    //         thumbsUp: 0,
    //         wow: 0,
    //         heart: 0,
    //         rocket: 0,
    //         coffee: 0,
    //       },
    //     },
    //   }),
    //   invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    // }),
    updateTip: builder.mutation({
      query: (initialTip) => ({
        url: `/tip/${initialPost.txHash}`,
        method: 'PUT',
        body: {
          type: 'update',
          data: { ...initialTip, date: new Date().toISOString() },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Tip', id: arg.txHash }],
    }),
    // deletePost: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/posts/${id}`,
    //     method: 'DELETE',
    //     body: { id },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    // }),
    setNotDisplayed: builder.mutation({
      query: ({ tipTxHash, userWalletAddress }) => ({
        url: `tip/${tipTxHash}`,
        method: 'PATCH',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { type: 'unsetShowed', data: { tipTxHash } },
      }),
      async onQueryStarted({ txHash }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getTipsByUserWallet', userWalletAddress, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const tip = draft.entities[txHash];
            if (tip) tip.displayed = false;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  // useGetTipsQuery,
  useGetTipsByUserWalletQuery,
  useUpdateTipMutation,
  useSetNotDisplayedMutation,
} = extendedApiSlice;

// returns the query result object
export const selectTipsResult = extendedApiSlice.endpoints.getTipsByUserWallet.select;
// .select();

// Creates memoized selector
const selectTipsData = createSelector(
  selectTipsResult,
  (tipsResult) => tipsResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTips,
  selectById: selectTipsByTxHash,
  selectIds: selectTipsIds,
  // Pass in a selector that returns the posts slice of state
} = tipsAdapter.getSelectors((state) => selectTipsData(state) ?? initialState);
