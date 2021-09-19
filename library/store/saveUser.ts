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
    saveUser(state, { payload }: PayloadAction<LoginUser | CreatedUser>) {
      const { token, profile, myGroupStatus, nth } = payload;
      sessionStorage.setItem(
        'USER',
        JSON.stringify({
          token,
          profile,
          myGroupStatus,
          nth,
          master: (payload as LoginUser).master ?? false,
        }),
      );

      return { ...state, ...payload };
    },
    setUserProfileImg: (state, { payload }: PayloadAction<string>) => {
      const userFromSessionStorage = sessionStorage.getItem('USER');

      if (userFromSessionStorage) {
        sessionStorage.setItem(
          'USER',
          JSON.stringify({ ...JSON.parse(userFromSessionStorage), profile: payload }),
        );
      }

      return { ...state, profile: payload };
    },
  },
});

export const { saveUser, setUserProfileImg } = user.actions;
export const currentUser = (state: AppState): LoginUser | CreatedUser => state.user;
export default user.reducer;
