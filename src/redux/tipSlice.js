import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTipsByUser: builder.query({
      query: (queryParams) => ({
        url: `/tip`,
        params: {
          ...queryParams,
        },
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => {
        // console.log(error)
        return [...result.map(({ txHash }) => ({ type: 'Tip', txHash }))]
      },
    }),
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

export const { useGetTipsByUserQuery, useSetNotDisplayedMutation, useUpdateTipMutation } =
  extendedApiSlice;