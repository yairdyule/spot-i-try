"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var pg_1 = require("pg");
var config_js_1 = require("../config.js");
var pool = new pg_1.Pool({
    user: config_js_1.config.DB_USER,
    host: config_js_1.config.DB_HOST,
    database: config_js_1.config.DB_DATABASE,
    password: config_js_1.config.DB_PASSWORD,
    port: config_js_1.config.DB_PORT,
});
var query = function (queryText, params) {
    return pool.query(queryText, params);
};
exports.query = query;
