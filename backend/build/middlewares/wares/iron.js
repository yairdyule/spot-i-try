"use strict";
exports.__esModule = true;
exports.session = void 0;
var express_1 = require("iron-session/express");
var index_1 = require("../../auth/index");
exports.session = (0, express_1.ironSession)(index_1.sessionOptions);
