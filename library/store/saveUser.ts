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
    is_group_joined: false,
  },
  reducers: {
    saveUser(state, { payload }: PayloadAction<LoginUser | CreatedUser>) {
      const { token, thumbnail, myGroupStatus, batch, is_group_joined } = payload;
      sessionStorage.setItem(
        'USER',
        JSON.stringify({
          token,
          thumbnail,
          myGroupStatus,
          batch,
          is_manager: (payload as LoginUser).is_manager ?? false,
          is_group_joined,
        }),
      );

      return { ...state, ...payload };
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
