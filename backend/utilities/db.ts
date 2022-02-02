import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

type User = {
  name: string;
  email: string;
  password: string;
} | null;

export async function findUser(details: User) {
  let data = await db.user.findFirst({
    where: {
      email: details?.email,
      password: details?.password,
    },
  });
  return data;
}

export async function createUser(details: User) {
  if ((await findUser(details)) !== null) {
    console.log("user already exists");

    return null;
  }
}
