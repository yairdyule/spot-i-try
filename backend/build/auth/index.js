"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sessionOptions = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports.sessionOptions = {
    cookieName: "arstneioarstneioarstneioarstneoi",
    password: process.env.IRON_PASSWORD,
    cookieOptions: {
        secure: false
    }
};