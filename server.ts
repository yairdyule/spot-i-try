import { connectDB } from "./database";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ---- --- --- ------ --- --- ----- --- --- ---

// https://www.codingdeft.com/posts/nodejs-react-cors-error/ god bless
const domainsFromEnv = process.env.CORS_DOMAINS || " ";

const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

import cors from "cors";
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

import spotify from "./spotify";
app.use("/", spotify);

app.listen(process.env.PORT || 8000, async () => {
  console.log(`server listening on http://localhost:8000/`);
  await connectDB();
});
