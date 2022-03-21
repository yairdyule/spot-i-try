"use strict";
exports.__esModule = true;
exports.Wares = void 0;
var cors_1 = require("./wares/cors");
var express_1 = require("./wares/express");
var iron_1 = require("./wares/iron");
exports.Wares = [cors_1.CorsOptions, express_1.ExpressJSON, express_1.ExpressUrlEncoding, iron_1.session];
