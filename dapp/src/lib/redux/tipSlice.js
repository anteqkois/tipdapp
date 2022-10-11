import api from '@/api/apiConfig';
import { asyncStatus } from '@/ts/utils';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

export const getTipsByUser = createAsyncThunk(
  'tips/getTipsByUser',
  async (queryParams, thunkAPI) => {
    //TODO! check if not fetched !
    const { tips } = thunkAPI.getState();
    try {
      const { data } = await api.get('tip', {
        params: { ...queryParams, pageSize: tips.pageSize },
      });
      const ids = data.tips.reduce((prev, curr) => [...prev, curr.txHash], []);
      return { tips: data.tips, ids, amount: data.count };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
  {
    condition: (queryParams, { getState }) => {
      const { tips } = getState();
      return (
        tips.pagination?.pages[queryParams.page]?.status !==
          asyncStatus.loading &&
        tips.pagination?.pages[queryParams.page]?.status !== asyncStatus.success
      );
    },
    dispatchConditionRejection: true,
  }
);

const tipsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date)
  selectId: (tip) => tip.txHash,
});

const initialState = tipsAdapter.getInitialState({
  currentPage: 1,
  pageSize: 4,
  amount: 0,
  fetchedPage: [],
  status: asyncStatus.idle, //'idle' | 'loading' | 'success' | 'fail'
  error: null,
  pagination: {
    pages: {},
  },
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTipsByUser.pending, (state, arg) => {
      state.pagination.pages[arg.meta.arg.page] = {
        status: asyncStatus.loading,
        ids: [],
      };
      state.status = asyncStatus.loading;
    });
    builder.addCase(getTipsByUser.fulfilled, (state, action) => {
      tipsAdapter.upsertMany(state, action.payload.tips);
      state.error = null;
      state.status = asyncStatus.success;
      state.currentPage = action.meta.arg.page;
      state.amount = action.payload.amount;
      state.fetchedPage.push(action.meta.arg.page);
      state.pagination.pages[action.meta.arg.page] = {
        // lastUpdateTime: 1516177824891,
        status: asyncStatus.success,
        ids: action.payload.ids,
      };
    });
    builder.addCase(getTipsByUser.rejected, (state, action) => {
      if (action.error.name === 'ConditionError') {
        state.currentPage = action.meta.arg.page;
      } else if (action.payload.name === 'ApiError') {
        state.error = action.payload.userMessage;
        state.status = asyncStatus.fail;
      } else {
        state.error = action.payload;
        state.status = asyncStatus.fail;
      }
    });
  },
});

export const { resetError, setCurrentPage } = tipsSlice.actions;

export const tipsSelectors = tipsAdapter.getSelectors((state) => {
  return state.tips;
});

// export const selectIdsPerPage = (page) => (state) => state.tips.pagination?.pages[page].ids;

export const selectIdsPerPage = createSelector(
  [(state) => state.tips.pagination, (state) => state.tips.currentPage],
  (pagination, currentPage) => pagination?.pages[currentPage]?.ids ?? []
);

export const selectTipsPerPage = createSelector(
  [(state) => state.tips.entities, selectIdsPerPage],
  (entities, idsForPage) =>
    idsForPage.reduce(
      (previousValue, id) => [...previousValue, entities[id]],
      []
    )
);

export const selectCurrentData = createSelector(
  [
    (state) => state.tips.status,
    (state) => state.tips.error,
    selectTipsPerPage,
  ],
  (status, error, tips) => {
    return { status, error, tips };
  }
);
export const selectError = createSelector(
  [(state) => state.tips.error],
  (error) => error
);
export const selectStatus = createSelector(
  [(state) => state.tips.status],
  (status) => status
);
export const selectTipsAmount = createSelector(
  [(state) => state.tips.amount],
  (amount) => amount
);
export const selectPageSize = createSelector(
  [(state) => state.tips.pageSize],
  (pageSize) => pageSize
);
export const selectPageAmount = createSelector(
  [selectTipsAmount, selectPageSize],
  (amount, pageSize) => Math.ceil(amount / pageSize)
);

// export const selectPage = (start, end) => (state) => state.tips.entities.slice(start, end);

export default tipsSlice.reducer;
