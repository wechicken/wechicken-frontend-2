import { configureStore } from '@reduxjs/toolkit';
import reducer from 'library/store/rootReducer';

export const store = configureStore({
  reducer: {
    reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
