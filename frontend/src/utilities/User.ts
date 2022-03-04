import axios from "axios";
import { Data } from "../types";

/**
 * fetch user with given password & email
 * @returns User or null
 */
export async function fetchUser(
  email: String,
  password: String
): Promise<Data | null> {
  let { data }: { data: Data } = await axios.post(
    "http://localhost:8000/user/login",
    {
      email: email,
      password: password,
    }
  );

  return data;
}
