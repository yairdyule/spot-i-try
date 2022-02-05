import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";

enum Classnames {
  h1 = "text-lg font-medium",
  Link = "text-emerald-300 font-semibold",
}

type Queue = {
  title: string;
  id: string;
  published: boolean;
};

export default function Home() {
  const [queues, setQueues] = useState([] as Queue[]);

  useEffect(() => {
    axios.get("http://localhost:8000/user/queues").then(({ data }) => {
      setQueues(data.queues);
    });
    return () => {
      setQueues([]);
    };
  }, []);

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
      {queues.map((q: Queue) => (
        <p>{q.title}</p>
      ))}
    </Main>
  );
}
