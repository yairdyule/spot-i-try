import React, { useState } from "react";
// import { fetchUser } from "../../utilities/User";
import { useAppDispatch } from "../../store/user/userHooks";
import { login } from "../../store/store";

enum classNames {
  input = "bg-black px-1 rounded-md border-2 border-emerald-200",
  form = "w-64 m-1 flex flex-col gap-2",
  button = "bg-emerald-300 rounded-md font-medium text-center",
}

interface FormInputProps {
  setData: React.Dispatch<any>;
}

export const LoginForm = ({ setData }: FormInputProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const useLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(login({}))
    // e.preventDefault();
    // let data = await fetchUser(email, password);
    // setData(data);
    // if (data?.success && data.user) {
    //   dispatch(
    //     login({ name: data.user.name, id: data.user.id, loggedIn: true })
    //   );
    // }
  };

  return (
    <>
      <h1>login</h1>
      <form className={classNames.form} onSubmit={useLogin}>
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
  );
};

export default LoginForm;
