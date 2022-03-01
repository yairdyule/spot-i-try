import * as trpc from "@trpc/server";
import { z } from "zod";

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
      return { msg: `farting: ${this.input}` };
    },
  });

export type AppRouter = typeof appRouter;
export default appRouter;
