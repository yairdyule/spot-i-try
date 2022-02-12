import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const db = new PrismaClient();

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
      res.status(200).send({
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
    const { username, password, email } = req.body;
    var result = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (result !== null) {
      console.log("dupe registration");
      return res.send({
        success: false,
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
    res.status(200).send({
      success: true,
      user: { id: result?.id, name: result?.name },
      msg: "signup success",
    });
  } catch (e) {
    console.error(e + " in /signup");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

userRouter.post("/details", async (req, res) => {
  try {
    const id = req.body.id;

    var result = await db.user.findFirst({
      where: {
        id: id,
      },
      select: {
        incomingQueues: {
          select: {
            title: true,
          },
        },
        friends: {
          select: {
            name: true,
          },
        },
        sentQueues: {
          select: {
            title: true,
          },
        },
        profile: {
          select: {
            bio: true,
          },
        },
      },
    });

    // console.log(`'user's queues: ${console.table(queues)}`);

    //want to get a user's...
    //  queues
    //  friends
    //  profile (bio, etc)

    console.log(result);

    if (result === null) {
      return res.send({
        success: false,
        msg: "nobody exists with that id",
      });
    }

    res.send({
      success: true,
      details: result,
    });
  } catch (e) {
    console.error(e + " in /signup");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

export default userRouter;
