import ax from "./axios";
import { ApiResult, Data } from "../types";

/**
 * fetch user with given password & email
 * @returns User or null
 */
export async function fetchUser(
  email: String,
  password: String
): Promise<Data | null> {
  let { data } = await ax.post("/user/login", {
    email: email,
    password: password,
  });
  return data;
}
