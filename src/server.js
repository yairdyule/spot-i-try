"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var spotify_1 = __importDefault(require("./spotify"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use('/', spotify_1.default);
// app.get('/', (_, res) => {
//   res.send('helloooo world ;D')
// })
app.listen(process.env.PORT || 3000, function () {
    console.log("express listening on http://localhost:3000/");
});
