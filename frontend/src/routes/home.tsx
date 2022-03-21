import { Main } from "../components/Layout";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/user/userHooks";
import { User } from "../types";

enum Classnames {
  h1 = "text-lg font-medium",
  Link = "text-emerald-300 font-semibold",
}

export default function Home() {
  const User: User = useAppSelector((state) => state.User);

  if (!User.loggedIn) {
    return (
      <Main>
        <h1 className={Classnames.h1}>Welcome to Vynilla!</h1>
        <p>
          You may{" "}
          <Link to="/login" className={Classnames.Link}>
            login
          </Link>
          , or, of course, you can{" "}
          <Link to="/signup" className={Classnames.Link}>
            signup
          </Link>
        </p>
      </Main>
    );
  }

  return (
    <Main>
      {User.loggedIn && (
        <h1 className={Classnames.h1}>Welcome to Vynilla, {User.name}!</h1>
      )}
    </Main>
  );
}
