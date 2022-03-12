import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk('users/login', async ({ email, password }, thunkAPI) => {
  try {
    //Below is api call
    // const response = await user.login({ email, password });
    const data = {
      username: 'anteqkois',
      email: email,
      role: 'admin',
    };
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('users/logout', async (thunkAPI) => {
  try {
    // const response = await user.logout();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk('users/signup', async ({ username, email, password, role }, thunkAPI) => {
  try {
    // const response = await user.signup({ username, email, password, role });
    const data = {
      username: 'signup',
      email: 'test@gmail.com',
      role: 'admin',
    };
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      // localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log({state, action});
      state.error = action.payload.error;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.error = null;
      // localStorage.removeItem('user');
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload.error;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      // localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export default userSlice.reducer;
