import axios from "axios";
import { useContext, useEffect, useState } from "react";

type Props = {
  id: number;
};

type ProfileDetails = {};

export default function ProfileDetails({ id }: Props) {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:8000/user/details", { id: id })
      .then(({ data }) => {
        console.log(data);
        setData("score");
      });
  }, []);

  return <h1>{data}</h1>;
}
