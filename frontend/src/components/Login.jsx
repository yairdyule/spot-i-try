import axios from "axios";
import { useState } from "react";
import Alert from "./Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();

  const login = async (e) => {
    e.preventDefault();
    let data = await axios.post("http://localhost:8000/user/login", {
      email: email,
      password: password,
    });
    console.log(data.data);
    setData(data.data);
  };

  return (
    <main className="p-2 flex flex-col items-center justify-center ">
      {data && <Alert success={data.success} action="logged in" />}
      <h1>Login</h1>
      <form className="w-64 m-1 flex flex-col gap-2" onSubmit={login}>
        <input
          type="email"
          placeholder="email"
          className="bg-black px-1 rounded-md border-2 border-emerald-200"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-black px-1 rounded-md border-2 border-emerald-200"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-emerald-300 rounded-md font-medium text-center "
        >
          login
        </button>
      </form>
    </main>
  );
}
