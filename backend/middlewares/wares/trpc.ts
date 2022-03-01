import * as trpc from "@trpc/server";
import * as tExpress from "@trpc/server/adapters/express";
import appRouter from "../../routes/trpc";

const createContext = ({
  req,
  res,
}: tExpress.CreateExpressContextOptions) => ({});

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const TrpcWare = tExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
