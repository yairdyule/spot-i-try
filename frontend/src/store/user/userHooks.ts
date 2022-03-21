import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { User } from "../../types";
import { AppDispatch, login, logout, RootState } from "../store";

/**
 * selectors
 */

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUserSelector = (): User => useAppSelector((state) => state.User);

/**
 * dispatches
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useLoginDispatch = (User: User) => {
  const dispatch = useAppDispatch();
  dispatch(login(User));
};

export const useLogoutDispatch = () => {
  const dispatch = useAppDispatch();
  dispatch(logout());
};
