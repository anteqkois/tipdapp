import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './apiSlice.js';
import { combineReducers } from 'redux';
import signUpFormReducer from './signUpFormSlice';
import tipReducer from './tipSlice.js';
// import userReducer from './userSlice.js';

const reducer = combineReducers({
  tips: tipReducer,
  signUpForm: signUpFormReducer,
});

const store = configureStore({
  reducer,
});

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
// });

export default store;
