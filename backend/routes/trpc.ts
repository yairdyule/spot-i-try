import * as trpc from "@trpc/server";
import { resolve } from "path/posix";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const db = new PrismaClient();

const UserModel = db.user;

const appRouter = trpc
  .router()
  .query("hello", {
    input: z.string().nullish(),
    async resolve(req) {
      return { msg: "hello" };
    },
  })
  .query("fart", {
    input: z.string(),
    resolve(req) {
      console.log(this.input);
      return { msg: `farting: ${this.input}` };
    },
  })
  .query("login", {
    input: z.object({ email: z.string(), password: z.string() }),
    async resolve(req) {
      let data = this.input;

      return { data: this.input };
    },
  });

export type AppRouter = typeof appRouter;
export default appRouter;
