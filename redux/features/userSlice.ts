import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the User interface with all properties from your JSON
interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  isDeleted: boolean;
  token: string;
  // Note: password is not included here for security reasons
}

export const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: () => {
      return null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      if (state) {
        return { ...state, token: action.payload };
      }
      return state;
    }
  },
});

export const { login, logout /* updateProfile, refreshToken */ } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: RootState): User | null => state.user;
export const selectIsAuthenticated = (state: RootState): boolean => !!state.user;
export const selectUserRole = (state: RootState): string | undefined => state.user?.role;