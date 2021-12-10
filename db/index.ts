import { Pool } from "pg";
import dotenv from "dotenv";

import { config } from "../config.js";

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

export const query = (queryText: string, params: any[]) =>
  pool.query(queryText, params);
