import { validateFormData } from '@/api/auth';
import { asyncStatus } from '@/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

export const validateUserData = createAsyncThunk(
  'user/validateUserData',
  async (userData, thunkAPI) => {
    try {
      const data = await validateFormData(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  data: {
    firstName: null,
    lastName: null,
    email: null,
    nick: null,
  },
  status: asyncStatus.idle, //'idle' | 'loading' | 'succeeded' | 'failed'
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
  },
  extraReducers: (builder) => {
    builder.addCase(validateUserData.pending, (state, arg) => {
      state.status = asyncStatus.loading;
      state.errors = null;
    });
    builder.addCase(validateUserData.fulfilled, (state, action, arg) => {
      state.status = asyncStatus.success;
      state.data = { ...state.data, ...action.meta.arg };
      state.step = state.step + 1;
      state.errors = null;
    });
    builder.addCase(validateUserData.rejected, (state, action) => {
      state.errors = action.payload;
      state.status = asyncStatus.fail;
    });
  },
});

export const { resetErrors, resetForm, setErrors, setStep } =
  signUpForm.actions;
// export const { resetError, resetForm, setField, setFields } = signInForm.actions;

export const selectErrors = createSelector(
  [(state) => state.signUpForm.errors],
  (errors) => errors
);
export const selectFormData = createSelector(
  [(state) => state.signUpForm.data],
  (data) => data
);
export const selectStatus = createSelector(
  [(state) => state.signUpForm.status],
  (status) => status
);
export const selectActiveStep = createSelector(
  [(state) => state.signUpForm.step],
  (step) => step
);

export default signUpForm.reducer;
