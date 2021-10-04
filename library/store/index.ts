import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import user from 'library/store/saveUser';
import isLoginModalOn from 'library/store/setLoginModal';
import alert from 'library/store/setAlert';
import toast from './toast';

export const store = configureStore({
  reducer: {
    user,
    isLoginModalOn,
    alert,
    toast,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
