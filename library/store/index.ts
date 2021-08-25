import { configureStore } from '@reduxjs/toolkit';
import user from 'library/store/saveUser';

export const store = configureStore({
  reducer: {
    user
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
