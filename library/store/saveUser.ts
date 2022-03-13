import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatedUser, LoginUser } from 'library/models/main';
import { AppState } from '.';

export const user = createSlice({
  name: 'user',
  initialState: {
    token: '',
    thumbnail: '',
    myGroupStatus: false,
    batch: {
      nth: 0,
      title: '',
    },
    message: '',
    isGroupJoined: false,
  },
  reducers: {
    saveUser(state, { payload }: PayloadAction<LoginUser | CreatedUser>) {
      const user = { ...payload, isManager: (payload as LoginUser).isManager ?? false };

      sessionStorage.setItem('USER', JSON.stringify(user));

      return user;
    },
    setUserProfileImg: (state, { payload }: PayloadAction<string>) => {
      const userFromSessionStorage = sessionStorage.getItem('USER');

      if (userFromSessionStorage) {
        sessionStorage.setItem(
          'USER',
          JSON.stringify({ ...JSON.parse(userFromSessionStorage), thumbnail: payload }),
        );
      }

      return { ...state, thumbnail: payload };
    },
  },
});

export const { saveUser, setUserProfileImg } = user.actions;
export const currentUser = (state: AppState): LoginUser | CreatedUser => state.user;
export default user.reducer;
