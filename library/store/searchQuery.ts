import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '.';

export const query = createSlice({
  name: 'query',
  initialState: '',
  reducers: {
    searchQuery(state, action: PayloadAction<string>) {
      return state = action.payload;
    },
  },
});

export const { searchQuery } = query.actions;
export const queryToSearch = (state: AppState): string => state.query;
export default query.reducer;
