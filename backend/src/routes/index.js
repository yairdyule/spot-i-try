"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SpotifyRouter = exports.UserRouter = void 0;
var index_1 = require("../utilities/index");
var user_1 = __importDefault(require("./user"));
var spotify_1 = __importDefault(require("./spotify"));
exports.UserRouter = (0, index_1.RouteBuilder)("/user", user_1["default"]);
exports.SpotifyRouter = (0, index_1.RouteBuilder)("/spotify", spotify_1["default"]);
