import { useContext } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import { UserContext } from "../hooks/UserContext";
import { trpc } from "../utilities/trpc";

enum Classnames {
  h1 = "text-lg font-medium",
  Link = "text-emerald-300 font-semibold",
}

export default function Home() {
  const hello = trpc.useQuery(["hello"]);

  const User = useContext(UserContext);

  if (!hello.data) return <div>loading...</div>;

  return (
    <Main>
      {hello.data?.msg}
      {User?.user?.loggedIn ? (
        <>
          <h1 className={Classnames.h1}>
            Welcome to Vynilla, {User.user.name}!
          </h1>
        </>
      ) : (
        <>
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
        </>
      )}
    </Main>
  );
}
