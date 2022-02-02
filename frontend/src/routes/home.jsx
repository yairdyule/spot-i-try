import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="p-2">
      <h1 className="text-lg font-medium">Welcome to Vynilla!</h1>
      {/*login*/}
      <p>
        {" "}
        You may
        <Link to="/login" className="text-emerald-300 font-semibold">
          {" "}
          login
        </Link>
        , or, of course, you can
        <Link to="/signup" className="text-emerald-300 font-semibold">
          {" "}
          signup
        </Link>
      </p>
      {/*signup*/}
    </main>
  );
}
