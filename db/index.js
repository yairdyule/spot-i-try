const { Pool } = require("pg");
const dotenv = require("dotenv");
const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = require("../config.js");

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
