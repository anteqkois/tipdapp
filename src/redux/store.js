import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice.js';
// import { combineReducers } from 'redux';
import userReducer from './userSlice.js';

// const reducer = combineReducers({
//   user: userReducer,
// });

// const store = configureStore({
//   reducer,
// });

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
