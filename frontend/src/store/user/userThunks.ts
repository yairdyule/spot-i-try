import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { signIn } from "../../services/user.service";
import { login, RootState } from "../store";

export const signUp =
  (
    username: string,
    email: string,
    password: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    const body = { username, email, password };
    signIn(body)
      .then(({ name, id }) => {
        dispatch(login({ name: name, id: id, loggedIn: true }));
      })
      .catch((error) => {});
  };
