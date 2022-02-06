import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

export type User = {
  name: string;
  id: number;
};

const sendFriendRequest = async (to: number, from: number) => {
  await axios.post("http://localhost:8000/user/sendFriendRequest", {
    to: to,
    from: from,
  });
};

// thanks for the awesome modal, creative tim!!!
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
const Modal = ({ users, userId }: { users: User[]; userId: number }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  // console.log(users);
  return (
    <>
      <FaPlusCircle onClick={() => setShowModal(true)} />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Send a friend request
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ease-linear transition-all duration-150">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="search a user"
                    className="bg-slate-700 text-slate-300 rounded-md px-2 mb-1"
                  />
                  <ul className="pl-4 ease-linear transition-all duration-150">
                    {name != "" &&
                      users
                        .filter((user) => user.name.includes(name))
                        .map((user: User) => {
                          return (
                            <li
                              className="my-0.5 list-disc hover:cursor-pointer hover:underline border-y-1 border-y-slate-500"
                              key={user.id}
                              onClick={() => sendFriendRequest(user.id, userId)}
                            >
                              {user.name}
                            </li>
                          );
                        })}
                  </ul>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-slate-500 background-transparent font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
