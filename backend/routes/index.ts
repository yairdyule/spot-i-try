import { RouteBuilder } from "../utilities/index";
import userRouter from "./user";
import spotifyRouter from "./spotify";
import queueRouter from "./queues";

export const UserRouter = RouteBuilder("/user", userRouter);
export const SpotifyRouter = RouteBuilder("/spotify", spotifyRouter);
export const QueueRouter = RouteBuilder("/queues", queueRouter);

export const Routes = [UserRouter, SpotifyRouter, QueueRouter];
