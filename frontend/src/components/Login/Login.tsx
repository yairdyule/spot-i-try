import { useState, useContext } from "react";
import { Main } from "../Layout";
import { Data, User } from "../../types";
import Alert from "../Alert";
import Form from "./loginForm";
import { useAppSelector } from "../../store/user/userHooks";

export default function Login() {
  const [data, setData] = useState<Data | null>(null);
  const User: User = useAppSelector((state) => state.User);

  if (!User.loggedIn) {
    return (
      <Main>
        <Form setData={setData} />
      </Main>
    );
  }

  return (
    <Main>
      {data && <Alert success={data.success} action="logged in" />}
      {User.loggedIn && <h2>Omg hi {User.name} </h2>}
    </Main>
  );
}
