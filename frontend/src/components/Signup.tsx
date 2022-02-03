import Alert from "./Alert";
import Main from "./Main";
import axios from "axios";
import { useState } from "react";

interface ApiResponse {
  success: boolean;
}

enum Classnames {
  form = "w-64 m-1 flex flex-col gap-2",
  input = "bg-black px-1 rounded-md border-2 border-emerald-200",
  button = "bg-emerald-300 rounded-md font-medium text-center",
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/signup", {
        username: name,
        email: email,
        password: password,
      })
      .then(({ data }) => {
        // console.log(data);
        setData(data);
      });
  };

  return (
    <Main>
      {data && <Alert success={data.success} action="signed up" />}
      <h1>Sign up!</h1>
      <form className={Classnames.form} onSubmit={(e) => login(e)}>
        <input
          type="email"
          placeholder="email"
          className={Classnames.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="username"
          className={Classnames.input}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="password"
          placeholder="password"
          className={Classnames.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className={Classnames.button}>
          login
        </button>
      </form>
    </Main>
  );
}
