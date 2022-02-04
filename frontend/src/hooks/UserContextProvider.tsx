import { createContext, useState } from "react";
import { UserContext } from "./UserContext";

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const [value, setValue] = useState({});
  return (
    <UserContext.Provider value={{ user: value, setUser: setValue }}>
      {children}
    </UserContext.Provider>
  );
};
