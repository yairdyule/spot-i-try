"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = require("./routes/index");
dotenv_1["default"].config();
var domainsFromEnv = process.env.WHITELISTED_URL;
var whitelist = domainsFromEnv === null || domainsFromEnv === void 0 ? void 0 : domainsFromEnv.split(",").map(function (item) { return item.trim(); });
var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || (whitelist === null || whitelist === void 0 ? void 0 : whitelist.indexOf(origin)) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};
var appOptions = {
    port: 8000,
    middlewares: [
        express_1["default"].urlencoded({ extended: true }),
        express_1["default"].json(),
        (0, cors_1["default"])(corsOptions),
    ],
    routes: [index_1.UserRouter, index_1.SpotifyRouter]
};
new app_1["default"](appOptions); //not sure if i like this style of initialization over explicitly `listening`
