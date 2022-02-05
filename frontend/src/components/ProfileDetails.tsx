import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import { FaPlusCircle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

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
  col = "flex flex-col  items-center justify-start",
  row = "flex flex-row justify-center  gap-8 p-3 ",
  h1 = "font-bold text-xl text-emerald-300",
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
      {details && (
        <>
          <div className={Classnames.row}>
            <FiGithub className="text-white bg-emerald-300 w-20 h-20 p-2 rounded-full" />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-emerald-300">
                {User?.user?.name}
              </h1>
              <div className="flex flex-row gap-3">
                <p>
                  <span className="font-semibold">
                    {details.friends.length}
                  </span>{" "}
                  {"friend"}
                  {details.friends.length > 1 && "s"}
                </p>
                |
                <p>
                  <span className="font-semibold">
                    {details.sentQueues.length}
                  </span>{" "}
                  {"Outgoing Queue"}
                  {details.sentQueues.length > 1 && "s"}
                </p>
                |
                <p>
                  <span className="font-semibold">
                    {details.incomingQueues.length}
                  </span>{" "}
                  {"Incoming Queue"}
                  {details.incomingQueues.length > 1 && "s"}
                </p>
              </div>
              <p>{details.profile.bio}</p>
            </div>
          </div>

          <div className={Classnames.row}>
            <div className={Classnames.col}>
              <h2 className={Classnames.h1}>Friends </h2>
              <ul>
                {details?.friends.map((friend: { name: string }) => {
                  return <li>{friend.name}</li>;
                })}
              </ul>
              {/*add friend icon*/}
              <FaPlusCircle />
            </div>

            <div className={Classnames.col}>
              <h2 className={Classnames.h1}>Incoming Queues</h2>
              <ul>
                {details?.incomingQueues.map((queue: { title: string }) => {
                  return <li>{queue.title}</li>;
                })}
              </ul>
            </div>

            <div className={Classnames.col}>
              <h2 className={Classnames.h1}>Outgoing Queues</h2>
              <ul>
                {details?.sentQueues.map((queue: { title: string }) => {
                  return <li>{queue.title}</li>;
                })}
              </ul>
              {/*add  queue icon*/}
              <FaPlusCircle />
            </div>
          </div>
        </>
      )}
    </>
  );
}
