"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    SPOTIFY_CLIENT_ID: process.env.CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.REDIRECT_URI,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: parseInt(process.env.DB_PORT),
};
