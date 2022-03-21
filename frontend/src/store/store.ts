import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";

export interface UserState {
  User: User;
}

const initialState = {
  User: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.User = action.payload;
    },
    logout: (state) => {
      state.User = {};
    },
  },
});

export const { login, logout } = userSlice.actions;
export const store = configureStore(userSlice);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
