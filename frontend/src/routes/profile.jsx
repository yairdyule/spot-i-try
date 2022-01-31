import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();

  const login = async (e) => {
    e.preventDefault();
    let data = await axios.post("http://localhost:8000/user/login", {
      email: email,
      password: password,
    });
    setData(data);
  };

  return (
    <main className="p-2">
      <form className="flex flex-col gap-2" onSubmit={login}>
        <input
          className="bg-black rounded-md border-2 border-emerald-200"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="bg-black rounded-md border-2 border-emerald-200"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-emerald-300 rounded-md font-medium text-sm text-center h-5"
        >
          login
        </button>
      </form>
    </main>
  );
}
