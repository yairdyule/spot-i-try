import { IronSessionOptions } from "iron-session";
import dotenv from "dotenv";
dotenv.config();

import type { User } from "../types";

export const sessionOptions: IronSessionOptions = {
  cookieName: "arstneioarstneioarstneioarstneoi",
  password: process.env.IRON_PASSWORD as string,
  cookieOptions: {
    secure: false,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
    poop: string;
  }
}
