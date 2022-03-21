"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ExpressJSON = exports.ExpressUrlEncoding = void 0;
var express_1 = __importDefault(require("express"));
exports.ExpressUrlEncoding = express_1["default"].urlencoded({ extended: true });
exports.ExpressJSON = express_1["default"].json();
