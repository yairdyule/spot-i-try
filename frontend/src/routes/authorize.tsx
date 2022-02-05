import { useContext } from "react";
import Main from "../components/Main";
import { UserContext } from "../hooks/UserContext";

enum Classnames {
  h2 = "text-lg pb-4",
  div = "flex flex-col gap-2 justify-center items-center",
}

export default function Authorize() {
  return (
    <Main>
      <h2 className={Classnames.h2}>
        {" "}
        We've gotta sort some stuff out with{" "}
        <span className="text-emerald-300">Spotify</span> first.
      </h2>
      <div className={Classnames.div}>
        <p>
          We simply need your permission to read & update certain parts of your
          profile.{" "}
        </p>
        <p>
          For example, we wish to be able to create playlists and add songs to
          them, for your friends' queues!
        </p>
        <p>If you're cool with that, we can get going.</p>
        <a
          href="http://localhost:8000/spotify/auth"
          className="text-emerald-300"
          onClick={() => {
            // setAuthorized();
          }}
        >
          gopher it
        </a>
      </div>
    </Main>
  );
}
