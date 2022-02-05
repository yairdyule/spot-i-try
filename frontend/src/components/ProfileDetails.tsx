import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";

type Props = {
  id: number;
};

type ProfileDetails = {
  friends: [{ name: string }];
  incomingQueues: [{ title: string }];
  sentQueues: [{ title: string }];
  profile: {
    bio: string;
  };
} | null;

enum Classnames {
  col = "flex flex-col border-2 border-emerald-300",
  row = "flex flex-row justify-center space-between gap-6",
}

export default function ProfileDetails({ id }: Props) {
  const [details, setDetails] = useState(null as ProfileDetails);
  const User = useContext(UserContext);

  useEffect(() => {
    axios
      .post("http://localhost:8000/user/details", { id: id })
      .then((data) => {
        console.log(data.data.details);
        setDetails(data.data.details);
      });
    return () => {
      setDetails(null);
    };
  }, []);

  return (
    <>
      {details && <h1>{details.profile.bio}</h1>}
      <div className={Classnames.row}>
        <div className={Classnames.col}>
          <h1 className="border-2 border-b-slate-200">Friends </h1>
          <ul>
            {details?.friends.map((friend: { name: string }) => {
              return <li>{friend.name}</li>;
            })}
          </ul>
          {/*add friend icon*/}
        </div>
        <div className={Classnames.col}>
          <h1 className="border-b-slate-200">Incoming Queues</h1>
          <ul>
            {details?.incomingQueues.map((queue: { title: string }) => {
              return <li>{queue.title}</li>;
            })}
          </ul>
        </div>
        <div className={Classnames.col}>
          <h1 className="border-b-slate-200">Outgoing Queues</h1>
          <ul>
            {details?.sentQueues.map((queue: { title: string }) => {
              return <li>{queue.title}</li>;
            })}
          </ul>
          {/*add  queue icon*/}
        </div>
      </div>
    </>
  );
}
