import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, actions) => {
      state = actions.payload;
      return state;
    },
    logout: () => {
      return null;
    },
  },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
