import { useState, useContext } from "react";
import Main from "../Main";
import Alert from "../Alert";
import { UserContext } from "../../hooks/UserContext";
import Form from "./loginForm";
import { Data } from "../../types";

export default function Login() {
  const [data, setData] = useState<Data | null>(null);
  const User = useContext(UserContext);

  return (
    <Main>
      {data && <Alert success={data.success} action="logged in" />}
      {User?.user?.loggedIn ? (
        <h2>Omg hi {User.user.name} </h2>
      ) : (
        <Form setData={setData} />
      )}
    </Main>
  );
}
