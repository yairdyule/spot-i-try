import { RouteBuilder } from "../utilities/index";
import userRouter from "./user";
import spotifyRouter from "./spotify";

export const UserRouter = RouteBuilder("/user", userRouter);
export const SpotifyRouter = RouteBuilder("/spotify", spotifyRouter);
