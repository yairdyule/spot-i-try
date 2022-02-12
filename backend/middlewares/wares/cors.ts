import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const domainsFromEnv = process.env.WHITELISTED_URL;
const whitelist = domainsFromEnv?.split(",").map((item) => item.trim());

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist?.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export const CorsOptions = cors(corsOptions);
