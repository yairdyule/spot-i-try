import { RouteBuilder } from "../utilities/index";
import userRouter from "./user";

export const UserRouter = RouteBuilder("/user", userRouter);
