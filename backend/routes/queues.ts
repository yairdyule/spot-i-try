import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const queueRouter = Router();
const db = new PrismaClient();

//return all queues
queueRouter.get("/queues", async (req, res) => {
  const allQueues = await db.queue.findMany({});
  res.send({ queues: allQueues });
});

queueRouter.get("/queues:id", async (req, res) => {
  const { id } = req.params;

  const queue = await db.queue.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  console.log(queue?.title);
  res.send("found it!");
});

export default queueRouter;
