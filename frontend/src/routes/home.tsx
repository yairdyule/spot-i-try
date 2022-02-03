import { Link } from "react-router-dom";
import Main from "../components/Main";

enum Classnames {
  h1 = "text-lg font-medium",
  Link = "text-emerald-300 font-semibold",
}

export default function Home() {
  return (
    <Main>
      <h1 className={Classnames.h1}>Welcome to Vynilla!</h1>
      <p>
        You may
        <Link to="/login" className={Classnames.Link}>
          login
        </Link>
        , or, of course, you can
        <Link to="/signup" className={Classnames.Link}>
          signup
        </Link>
      </p>
      {/*signup*/}
    </Main>
  );
}
