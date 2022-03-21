"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CorsOptions = void 0;
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
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
exports.CorsOptions = (0, cors_1["default"])(corsOptions);
