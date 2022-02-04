import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import Main from "../components/Main";

export default function Profile() {
  const User = useContext(UserContext);

  const isLoggedIn = User?.user?.loggedIn;
  const name = User?.user?.name;

  return (
    <Main>
      {isLoggedIn ? (
        <h1>Hello, {name}!</h1>
      ) : (
        <h1>
          You must{" "}
          <Link to="/login" className="text-emerald-300 font-semibold">
            login
          </Link>
        </h1>
      )}
    </Main>
  );
}
