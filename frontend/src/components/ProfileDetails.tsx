import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import { FaPlusCircle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import Modal from "../components/Modal";

type Props = {
  id: number;
};

export type User = {
  name: string;
  id: number;
};

type ProfileDetails = {
  friends: [User];
  friendRequests: [User];
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
  const [friends, setFriends] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [incomingQueues, setIncoming] = useState([]);
  const [outgoingQueues, setOutgoing] = useState([]);
  const User = useContext(UserContext);

  const getFriends = async () => {
    axios
      .get("http://localhost:8000/user/getFriends", {
        params: { userId: User?.user?.id },
      })
      .then(({ data }) => {
        let friendRequests: [{ name: string; id: number }] =
          data.friendRequests;
        let friends: [{ name: string; id: number }] = data.friends;

        setFriends(
          friends.filter(
            (friend) => friendRequests.map((req) => req.id).includes(friend.id) //by design, a "friend" is only one which is in both "friends" and "friendRequests"
          )
        );
      });
  };

  const getIncomingQueues = async () => {
    axios
      .get("http://localhost:8000/user/incomingQueues", {
        params: { userId: User?.user?.id },
      })
      .then(({ data }) => {
        setIncoming(data.incomingQueues);
      });
  };

  const getOutgoingQueues = async () => {
    axios
      .get("http://localhost:8000/user/outgoingQueues", {
        params: { userId: User?.user?.id },
      })
      .then(({ data }) => {
        setOutgoing(data.outgoingQueues);
      });
  };

  const getUsers = async () => {
    axios.get("http://localhost:8000/user/").then(({ data }) => {
      setUsers(data.users as User[]);
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/user/details", { id: id })
      .then((data) => {
        setDetails(data.data.details);
      });

    (async () => {
      await getFriends();
      await getIncomingQueues();
      await getOutgoingQueues();
      await getUsers();
    })();

    return () => {
      setDetails(null);
    };
  }, []);

  return (
    <>
      {incomingQueues && outgoingQueues && friends && users && (
        <>
          <div className={Classnames.row}>
            <FiGithub className="text-white bg-emerald-300 w-20 h-20 p-2 rounded-full" />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-emerald-300">
                {User?.user?.name}
              </h1>
              <div className="flex flex-row gap-3">
                <p>
                  <span className="font-semibold">{friends.length}</span>{" "}
                  {"friend"}
                  {friends.length > 1 && "s"}
                </p>
                <span className="text-emerald-300">|</span>
                <p>
                  <span className="font-semibold">{outgoingQueues.length}</span>{" "}
                  {"Outgoing Queue"}
                  {outgoingQueues.length > 1 && "s"}
                </p>
                <span className="text-emerald-300">|</span>

                <p>
                  <span className="font-semibold">{incomingQueues.length}</span>{" "}
                  {"Incoming Queue"}
                  {incomingQueues.length > 1 && "s"}
                </p>
              </div>
              <p>{details?.profile.bio}</p>
            </div>
          </div>

          <div className={Classnames.row}>
            <div className={Classnames.col}>
              <h2 className={Classnames.h1}>Friends </h2>
              <ul>
                {friends.map((friend: { name: string }) => {
                  return <li>{friend.name}</li>;
                })}
              </ul>
              {/*add friend*/}
              <Modal users={users} userId={User?.user?.id as number} />
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
