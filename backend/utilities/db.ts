import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function findUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  let data = await db.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
  return data;
}

export async function createUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  if ((await findUser({ email, name, password })) !== null) {
    console.log("user already exists");

    return null;
  }
}
