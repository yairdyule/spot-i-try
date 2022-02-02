import Alert from "./Alert";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    let data = await axios.post("http://localhost:8000/user/signup", {
      username: name,
      email: email,
      password: password,
    });
    console.log(data.data);
    setData(data.data);
  };

  return (
    <main className="p-2 flex flex-col items-center gap-2 justify-center ">
      {data && <Alert success={data.success} action="signed up" />}
      <h1>Sign up!</h1>
      <form className="w-64 m-1 flex flex-col gap-2" onSubmit={login}>
        <input
          type="email"
          placeholder="email"
          className="bg-black px-1 rounded-md border-2 border-emerald-200"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="username"
          className="bg-black px-1 rounded-md border-2 border-emerald-200"
          onChange={(e) => setName(e.target.value)}
          value={name}
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
