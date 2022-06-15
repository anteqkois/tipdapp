import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTips: builder.query({
      query: () => '/tip',
      transformResponse: (responseData) => {
        return responseData;
        // return tipsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: 'Tip', id: 'LIST' },
        ...result.map(({ txHash }) => ({ type: 'Tip', txHash })),
      ],
      // providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
    }),
    getTipsByUserWallet: builder.query({
      query: (queryParams) => ({
        url: `/tip`,
        params: {
          ...queryParams,
        },
      }),
      transformResponse: (responseData) => {
        console.log(responseData)
        return responseData;
        // return tipsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [...result.map(({ txHash }) => ({ type: 'Tip', txHash }))],
      // providesTags: (result, error, arg) => [...result.ids.map((id) => ({ type: 'Tip', id }))],
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

export const { useGetTipsQuery, useGetTipsByUserWalletQuery, useSetNotDisplayedMutation, useUpdateTipMutation } =
  extendedApiSlice;





// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
// // import { sub } from 'date-fns';
// import { apiSlice } from './apiSlice';

// const tipsAdapter = createEntityAdapter({
//   selectId: (tip) => tip.txHash,
//   sortComparer: (a, b) => b.date.localeCompare(a.date),
// });

// const initialState = tipsAdapter.getInitialState();

// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // getTips: builder.query({
//     //   query: () => '/tip',
//     //   transformResponse: (responseData) => {
//     //     return tipsAdapter.setAll(initialState, responseData);
//     //   },
//     //   providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
//     //   // providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
//     // }),
//     getTips: builder.query({
//       query: (queryParams) => ({
//         url: `/tip`,
//         params: {
//           ...queryParams,
//         },
//       }),
//       // transformResponse: (responseData) => {
//         // return tipsAdapter.setAll(initialState, responseData);
//       // },
//       // providesTags: (result, error, arg) => [...result.ids.map((id) => ({ type: 'Tip', id }))],
//       providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.map(({txHash}) => ({ type: 'Tip', txHash }))],
//       // providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
//     }),
//     getTipsByUserWallet: builder.query({
//       query: (queryParams) => ({
//         url: `/tip`,
//         params: {
//           ...queryParams,
//         },
//       }),
//       transformResponse: (responseData) => {
//         return tipsAdapter.setAll(initialState, responseData);
//       },
//       providesTags: (result, error, arg) => [...result.ids.map((id) => ({ type: 'Tip', id }))],
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

// export const { useGetTipsQuery, useGetTipsByUserWalletQuery, useSetNotDisplayedMutation, useUpdateTipMutation } =
//   extendedApiSlice;

// // returns the query result object
// export const selectTipsResult = extendedApiSlice.endpoints.getTips.select();

// // Creates memoized selector
// const selectTipsData = createSelector(
//   selectTipsResult,
//   (tipsResult) => tipsResult.data, // normalized state object with ids & entities
// );

// export const {
//   selectAll: selectAllTips,
//   selectById: selectTipByTxHash,
//   selectIds: selectTipsIds,
//   // Pass in a selector that returns the posts slice of state
// } = tipsAdapter.getSelectors((state) => selectTipsData(state) ?? initialState);










// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
// // import { sub } from 'date-fns';
// import { apiSlice } from './apiSlice';

// const tipsAdapter = createEntityAdapter({
//   selectId: (tip) => tip.txHash,
//   sortComparer: (a, b) => b.date.localeCompare(a.date),
// });

// const initialState = tipsAdapter.getInitialState();

// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getTips: builder.query({
//       query: () => '/tip',
//       transformResponse: (responseData) => {
//         return tipsAdapter.setAll(initialState, responseData);
//       },
//       providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
//       // providesTags: (result, error, arg) => [{ type: 'Tip', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Tip', id }))],
//     }),
//     getTipsByUserWallet: builder.query({
//       query: (queryParams) => ({
//         url: `/tip`,
//         params: {
//           ...queryParams,
//         },
//       }),
//       transformResponse: (responseData) => {
//         return tipsAdapter.setAll(initialState, responseData);
//       },
//       providesTags: (result, error, arg) => [...result.ids.map((id) => ({ type: 'Tip', id }))],
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

// export const {
//   useGetTipsQuery,
//   useGetTipsByUserWalletQuery,
//   useSetNotDisplayedMutation,
//   useUpdateTipMutation,
// } = extendedApiSlice;

// // returns the query result object
// export const selectTipsResult = extendedApiSlice.endpoints.getTips.select();

// // Creates memoized selector
// const selectTipsData = createSelector(
//   selectTipsResult,
//   (tipsResult) => tipsResult.data, // normalized state object with ids & entities
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllTips,
//   selectById: selectTipByTxHash,
//   selectIds: selectTipsIds,
//   // Pass in a selector that returns the posts slice of state
// } = tipsAdapter.getSelectors((state) => selectTipsData(state) ?? initialState);
