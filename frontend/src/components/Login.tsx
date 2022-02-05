import { useState, useContext } from "react";
import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom";

import Main from "./Main";
import Alert from "./Alert";
import { UserContext } from "../hooks/UserContext";
import { UserContextProvider } from "../hooks/UserContextProvider";

type User = {
  name: string;
  id: number;
  loggedIn: boolean;
  authorizedWithSpotify: boolean; //todo - consolidate types
};

type Data = {
  user: User;
  success: boolean;
};

type ApiResult = {
  /**
   * The data returned from the request
   */
  data: Data;
};

//omfg how did i just discover docstrings

/**
 * Global classnames for components/elements
 *
 * @example
 * ```tsx
 * <button className = {classNames.button}>...
 * ```
 */
enum classNames {
  input = "bg-black px-1 rounded-md border-2 border-emerald-200",
  form = "w-64 m-1 flex flex-col gap-2",
  button = "bg-emerald-300 rounded-md font-medium text-center",
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const User = useContext(UserContext);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: ApiResult = await axios.post("http://localhost:8000/user/login", {
      email: email,
      password: password,
    });
    if (data.data.success) {
      // User?.setUser({
      //   id: data.data.user.id,
      //   name: data.data.user.name,
      //   loggedIn: true,
      // });
      let oldUser = User?.user;
      let newUser = {
        id: data.data.user.id,
        name: data.data.user.name,
        loggedIn: true,
        authorizedWithSpotify: !!oldUser?.authorizedWithSpotify,
      };
      User?.setUser(newUser);
    }
    setData(data.data);
  };

  return (
    <Main>
      {data && <Alert success={data.success} action="logged in" />}
      {User?.user?.loggedIn ? (
        <h2>Omg hi {User.user.name} </h2>
      ) : (
        <>
          <h1>login</h1>
          <form className={classNames.form} onSubmit={(e) => login(e)}>
            <input
              type="email"
              placeholder="email"
              className={classNames.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className={classNames.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={classNames.button}>
              login
            </button>
          </form>
        </>
      )}
    </Main>
  );
}
