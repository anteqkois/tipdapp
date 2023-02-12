import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import { settingsReducer } from './settingsSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
type RootState = ReturnType<typeof rootReducer>;

// export type AppDispatch = typeof store.dispatch;
type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
const useAppDispatch: () => AppDispatch = useDispatch;
export type { RootState, AppDispatch };
export { store, useAppDispatch };

// export default store;
