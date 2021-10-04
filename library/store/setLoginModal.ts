import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '.';

export const isLoginModalOn = createSlice({
  name: 'isLoginModalOn',
  initialState: false,
  reducers: {
    setLoginModalOn(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setLoginModalOn } = isLoginModalOn.actions;
export const loginModal = (state: AppState): boolean => state.isLoginModalOn;
export default isLoginModalOn.reducer;
