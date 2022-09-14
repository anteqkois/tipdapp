import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import api from './apiConfig';

export const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  // USER_DETAILS: 'USER_DETAILS',
  // CONNECT_WALLET: 'CONNECT_WALLET',
};

export const validateUserData = createAsyncThunk('tips/validateUserData', async (userDetails, thunkAPI) => {
  //TODO! check if not fetched !
  try {
    const { data } = await api.post('auth/validate', { body: userDetails });
    console.log(data);
    // const ids = data.tips.reduce((prev, curr) => [...prev, curr.txHash], []);
    // return { tips: data.tips, ids, amount: data.count };
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    nick: '',
  },
  status: STATUS.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  step: 1,
  error: null,
};

const signInForm = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    // search: (state) => {
    //     // state.user = null;
    // },
    resetError: (state) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetForm: (state, action) => {
      state.data.firstName = '';
      state.data.lastName = '';
      state.data.email = '';
      state.data.nick = '';
    },
    // setField: (state, action) => {
    //   state.data[action.payload.field] = action.payload.value;
    // },
    // setFields: (state, action) => {
    //   state.data = action.payload;
    //   state.status = STATUS.USER_DETAILS;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(validateUserData.pending, (state, arg) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(validateUserData.fulfilled, (state, action, arg) => {
      state.status = STATUS.SUCCEEDED;
      state.step = state.step + 1;
    });
    builder.addCase(validateUserData.rejected, (state, action) => {
      // state.error = action.payload.userMessage;
      // state.status = STATUS.FAILED;
    });
  },
});

export const { resetError, resetForm, setError } = signInForm.actions;
// export const { resetError, resetForm, setField, setFields } = signInForm.actions;

export const selectError = createSelector([(state) => state.signInForm.error], (error) => error);
export const selectFields = createSelector([(state) => state.signInForm.data], (data) => data);
export const selectStatus = createSelector([(state) => state.signInForm.status], (status) => status);
export const selectActiveStep = createSelector([(state) => state.signInForm.step], (step) => step);

export default signInForm.reducer;
