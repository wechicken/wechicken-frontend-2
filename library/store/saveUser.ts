import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginUser } from 'library/models/main';

export const users = createSlice({
  name: 'users',
  initialState: {
    token: '',
    profile: '',
    myGroupStatus: false,
    myNth: 0,
    master: false,
  },
  reducers: {
    saveUser(state, action: PayloadAction<LoginUser>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveUser } = users.actions;
export default users.reducer;
