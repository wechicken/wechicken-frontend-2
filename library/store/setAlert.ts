import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'library/models/main';
import { AppState } from '.';

export const alert = createSlice({
  name: 'alert',
  initialState: null as null | Alert,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert | null>) => {
      return action.payload;
    },
  },
});

export const { setAlert } = alert.actions;
export const alertForm = (state: AppState): Alert | null => state.alert;
export default alert.reducer;
