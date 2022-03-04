import { ironSession } from "iron-session/express";
import { sessionOptions } from "../../auth/index";

export const session = ironSession(sessionOptions);
