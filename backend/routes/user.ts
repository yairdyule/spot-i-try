import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const db = new PrismaClient();

//return all users
userRouter.get("/", async (req, res) => {
  const allUsers = await db.user.findMany();
  res.send({ users: allUsers });
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(result);

    if (result?.password == password) {
      res
        .status(200)
        .send({
          success: true,
          user: { id: result?.id, name: result?.name },
          msg: "login success",
        });
    } else {
      res
        .status(200)
        .send({ success: false, msg: "invalid login credentials" });
    }
  } catch (e) {
    console.error(e + " in /login");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    console.log("got in to signup");
    console.log(req.body);

    const { username, password, email } = req.body;
    var result = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    console.log(result);

    if (result !== null) {
      return res.send({
        login: false,
        msg: "someone already exists with that username",
      });
    }

    result = await db.user.create({
      data: {
        name: username,
        email: email,
        password: password,
      },
    });
    console.log(result);
    res.send({ login: true });
  } catch (e) {
    console.error(e + " in /signup");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

export default userRouter;
