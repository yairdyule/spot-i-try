"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(appInit) {
        this.app = (0, express_1["default"])();
        this.port = appInit.port;
        this.middlewares(appInit.middlewares);
        this.routes(appInit.routes);
        this.listen();
    }
    App.prototype.middlewares = function (middlewares) {
        var _this = this;
        middlewares.forEach(function (ware) {
            _this.app.use(ware);
        });
    };
    App.prototype.routes = function (controllers) {
        var _this = this;
        controllers.forEach(function (route) {
            _this.app.use(route.route, route.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("app listening on http://localhost:".concat(_this.port));
        });
    };
    return App;
}());
exports["default"] = App;
