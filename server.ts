import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./database";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// https://www.codingdeft.com/posts/nodejs-react-cors-error/ god bless
const domainsFromEnv = process.env.CORS_DOMAINS || " ";
const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

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

app.get("/getHi", (req, res) => {
  res.send("hi from the server");
});

app.listen(process.env.PORT || 8000, async () => {
  console.log(`server listening on http://localhost:8000/`);
  await connectDB();
});
