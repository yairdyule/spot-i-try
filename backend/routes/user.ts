import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const db = new PrismaClient();

userRouter.get("/", async (req, res) => {
  console.log("get users");
  try {
    let { friendName = "" } = req.query;
    let users = await db.user.findMany({
      where: {
        name: {
          startsWith: friendName as string,
        },
      },
      select: {
        name: true,
        id: true,
      },
    });
    res.send({ users: users });
  } catch (err) {
    console.error(err + " in /");
    res.status(500).send({ success: false, msg: "sorrrryy!!!!" });
  }
});

//return all queues
userRouter.get("/queues", async (req, res) => {
  const allQueues = await db.queue.findMany({});
  res.send({ queues: allQueues });
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.user.findUnique({
      where: {
        email: email,
      },
    });

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
        friends: { select: { name: true, id: true } },
        friendRequests: { select: { name: true, id: true } },
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

userRouter.get("/incomingQueues", async (req, res) => {
  try {
    console.log("/incomingQueues");
    let data = req.query;
    let userId = parseInt(data.userId as string);

    let dbResult = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        incomingQueues: true,
      },
    });

    res.send({ success: true, incomingQueues: dbResult?.incomingQueues });
  } catch (err) {
    console.error(err + " in /incomingQueues");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

userRouter.get("/outgoingQueues", async (req, res) => {
  try {
    let data = req.query;
    let userId = parseInt(data.userId as string);
    console.log("/outgoingQueues");

    let dbResult = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        sentQueues: true,
      },
    });

    res.send({ success: true, outgoingQueues: dbResult?.sentQueues });
  } catch (err) {
    console.error(err + " in /outgoingQueues");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

//get friend reqs:
//      sent frqs, received frqs, and established friendships
//need: user id
userRouter.get("/getFriends", async (req, res) => {
  try {
    console.log("/getFriends");
    let data = req.query;

    let userId = parseInt(data.userId as string);

    //all requests
    let allFriends = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        friends: true,
      },
    });

    let requests = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        friendRequests: true,
      },
    });

    res.send({
      friendRequests: requests?.friendRequests,
      friends: allFriends?.friends,
    });
  } catch (err) {
    console.error(err + " in /getFriends");
    res.status(500).send({ success: false, msg: "our bad, server error" });
  }
});

userRouter.post("/sendFriendRequest", async (req, res) => {
  console.log("got frq");

  let { to, from } = req.body;

  //get user w/ id 'from'
  //add "from" to "to"'s friendRequests
  //add "to" to "from"'s friends
});

export default userRouter;
