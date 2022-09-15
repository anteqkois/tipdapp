import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'src/lib/apiConfig';

export const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  // USER_DETAILS: 'USER_DETAILS',
  // CONNECT_WALLET: 'CONNECT_WALLET',
};

export const validateUserData = createAsyncThunk('tips/validateUserData', async (userData, thunkAPI) => {
  try {
    const { data } = await api.post('auth/validate', userData);
    // console.log(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
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
  errors: null,
};

const signInForm = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    resetError: (state) => {
      state.errors = null;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    resetForm: (state, action) => {
      state.data.firstName = '';
      state.data.lastName = '';
      state.data.email = '';
      state.data.nick = '';
    },
    setStep: (state, action) => {
      state.step = action.payload;
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
      state.errors = null;
    });
    builder.addCase(validateUserData.fulfilled, (state, action, arg) => {
      state.status = STATUS.SUCCEEDED;
      state.step = state.step + 1;
      state.errors = null;
    });
    builder.addCase(validateUserData.rejected, (state, action) => {
      state.errors = action.payload;
      // state.status = STATUS.FAILED;
    });
  },
});

export const { resetError, resetForm, setError, setStep } = signInForm.actions;
// export const { resetError, resetForm, setField, setFields } = signInForm.actions;

export const selectErrors = createSelector([(state) => state.signInForm.errors], (errors) => errors);
export const selectFields = createSelector([(state) => state.signInForm.data], (data) => data);
export const selectStatus = createSelector([(state) => state.signInForm.status], (status) => status);
export const selectActiveStep = createSelector([(state) => state.signInForm.step], (step) => step);

export default signInForm.reducer;
