import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatedUser, LoginUser } from 'library/models/main';
import { AppState } from '.';

export const user = createSlice({
  name: 'user',
  initialState: {
    token: '',
    profile: '',
    myGroupStatus: false,
    nth: 0,
    message: '',
  },
  reducers: {
    saveUser(state, action: PayloadAction<LoginUser | CreatedUser>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveUser } = user.actions;
export const currentUser = (state: AppState): LoginUser | CreatedUser => state.user;
export default user.reducer;
