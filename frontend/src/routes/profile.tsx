import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import ProfileDetails from "../components/ProfileDetails";
import Main from "../components/Main";

export default function Profile() {
  const User = useContext(UserContext);

  const isLoggedIn = User?.user?.loggedIn;

  return (
    <Main>
      {isLoggedIn ? (
        <>
          <ProfileDetails id={User.user?.id as number} />
        </>
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
