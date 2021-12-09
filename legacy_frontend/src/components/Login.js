import { useState } from "react";
import axios from "axios";
import "../App.css";

export function Login() {
  // const [banner, setBanner] = useState("");
  // const [username, setUsername] = useState("");
  // const [pw, setPw] = useState("");
  // const [valid, setValid] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [showAlert, setAlert] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let validationData = await axios.post("http://localhost:8000/login", {
      username,
      pw,
    }); //todo: is this secure? don't think so
    console.log(validationData);
    if (!validationData.data.valid) {
      console.log("wrong"); //don't send them forward
      // setAlert(true);
    } else {
      // setValid(true);
    }
    // setLoading(false);
  }

  return <h1>login</h1>;
}
