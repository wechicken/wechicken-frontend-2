import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastConfig } from 'library/models';
import { AppState } from '.';

const INITIAL_STATE: ToastConfig = {
  message: '',
  duration: 3000,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState: INITIAL_STATE,
  reducers: {
    setToastConfig: (_, action: PayloadAction<ToastConfig>) => {
      const { message, duration } = action.payload;

      return { message, duration: duration ?? 3000 };
    },
  },
});

export const { setToastConfig } = toastSlice.actions;
export const toastSelector = (state: AppState): ToastConfig => state.toast;

export default toastSlice.reducer;
