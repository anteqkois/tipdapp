import { ASYNC_STATUS } from '@/utils/constants';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'src/lib/apiConfig';

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
    firstName: null,
    lastName: null,
    email: null,
    nick: null,
  },
  status: ASYNC_STATUS.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  step: 1,
  errors: null,
};

const signUpForm = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = null;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetForm: (state, action) => {
      state.data.firstName = null;
      state.data.lastName = null;
      state.data.email = null;
      state.data.nick = null;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    // setField: (state, action) => {
    //   state.data[action.payload.field] = action.payload.value;
    // },
    // setFields: (state, action) => {
    //   state.data = action.payload;
    //   state.status = ASYNC_STATUS.USER_DETAILS;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(validateUserData.pending, (state, arg) => {
      state.status = ASYNC_STATUS.LOADING;
      state.errors = null;
    });
    builder.addCase(validateUserData.fulfilled, (state, action, arg) => {
      // console.log(action.meta.arg);
      state.status = ASYNC_STATUS.SUCCEEDED;
      state.data = { ...state.data, ...action.meta.arg };
      state.step = state.step + 1;
      state.errors = null;
    });
    builder.addCase(validateUserData.rejected, (state, action) => {
      state.errors = action.payload;
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const { resetErrors, resetForm, setErrors, setStep } = signUpForm.actions;
// export const { resetError, resetForm, setField, setFields } = signInForm.actions;

export const selectErrors = createSelector([(state) => state.signUpForm.errors], (errors) => errors);
export const selectFormData = createSelector([(state) => state.signUpForm.data], (data) => data);
export const selectStatus = createSelector([(state) => state.signUpForm.status], (status) => status);
export const selectActiveStep = createSelector([(state) => state.signUpForm.step], (step) => step);

export default signUpForm.reducer;
