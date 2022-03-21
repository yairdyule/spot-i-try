import { Link } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails";
import { Main } from "../components/Layout";
import { useAppSelector } from "../store/user/userHooks";
import { User } from "../types";

export default function Profile() {
  const User: User = useAppSelector((state) => state.User);

  if (!User.loggedIn) {
    return (
      <Main>
        <h1>
          You must{" "}
          <Link to="/login" className="text-emerald-300 font-semibold">
            login
          </Link>
        </h1>
      </Main>
    );
  }

  return (
    <Main>
      <ProfileDetails id={User.id as number} />
    </Main>
  );
}
