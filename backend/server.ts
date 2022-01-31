import express from "express";
import cors from "cors";
import App from "./app";
import dotenv from "dotenv";
import { UserRouter, SpotifyRouter } from "./routes/index";

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

const appOptions = {
  port: 8000,
  middlewares: [
    express.urlencoded({ extended: true }),
    express.json(),
    cors(corsOptions),
  ],
  routes: [UserRouter, SpotifyRouter],
};

new App(appOptions); //not sure if i like this style of initialization over explicitly `listening`
