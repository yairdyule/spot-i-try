import { query as dbQuery } from "./index";
import { User, Relation, Queue, QueueContents } from "../types";

//should this be void? or return info about the added user
export async function addUser(name: string) {
  try {
    let { rows } = await dbQuery(` select * from users where name = $1;`, [
      name,
    ]);
    if (rows.length > 0) {
      console.log(rows[0]);
      console.log("user already exists - try logging in.");
      return rows[0] as User;
    }
  } catch (err) {
    console.error(err);
  }
}
