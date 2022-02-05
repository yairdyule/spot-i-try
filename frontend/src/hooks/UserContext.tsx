import { createContext } from "react";

type User = {
  name?: string;
  id?: number;
  loggedIn: boolean;
  authorizedWithSpotify: boolean;
};
interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<IUserContext | null>({
  user: null,
  setUser: (user: User) => {},
});
