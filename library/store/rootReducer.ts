import { combineReducers } from "@reduxjs/toolkit";
import currentUser from 'library/store/saveUser';

const reducer = combineReducers({
  currentUser
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;