"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
var client_1 = require("@prisma/client");
var express_1 = require("express");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var db = new client_1.PrismaClient();
var api = new spotify_web_api_node_1["default"]({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
var scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-top-read",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "playlist-modify-public",
    "playlist-modify-private",
];
var router = (0, express_1.Router)();
// route: /spotify/
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("receieved a req");
        res.redirect("/spotify/auth");
        return [2 /*return*/];
    });
}); });
// /spotify/auth
router.get("/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.redirect(api.createAuthorizeURL(scopes, "arstneio", true));
        return [2 /*return*/];
    });
}); });
// /spotify/callback
router.get("/callback", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error, code, state, auth, _b, access_token, refresh_token, expires_in, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, error = _a.error, code = _a.code, state = _a.state;
                if (error) {
                    return [2 /*return*/, res.status(400).send({
                            success: false,
                            msg: "failed to authenticate with spotify's API"
                        })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, api.authorizationCodeGrant(code)];
            case 2:
                auth = _c.sent();
                _b = auth.body, access_token = _b.access_token, refresh_token = _b.refresh_token, expires_in = _b.expires_in;
                api.setAccessToken(access_token);
                api.setRefreshToken(refresh_token);
                // set an interval (~3min) after which we refresh the access token
                // for this user. this allows for perpetual action on their
                // behalf, even when they're not on the app (in theory)
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var data, access_token_1, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, api.refreshAccessToken()];
                            case 1:
                                data = _a.sent();
                                access_token_1 = data.body["access_token"];
                                console.log("The access token has been refreshed!");
                                api.setAccessToken(access_token_1);
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                console.log("Problem retrieving refresh token: ");
                                console.log(err_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, (expires_in / 2) * 100);
                res.redirect("http://localhost:3000"); //get 'back in' to frontend
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).send({
                        success: false,
                        msg: "failed to authenticate with spotify's api"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/searchSong", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, tracks, sendies, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                query = req.query.query;
                if ((query === null || query === void 0 ? void 0 : query.length) == 0) {
                    return [2 /*return*/, res.send([])];
                }
                return [4 /*yield*/, api.searchTracks(query, { limit: 10 })];
            case 1:
                tracks = _b.sent();
                sendies = (_a = tracks.body.tracks) === null || _a === void 0 ? void 0 : _a.items.map(function (song) {
                    var artists = song.artists.map(function (artist) { return artist.name; });
                    return {
                        name: song.name,
                        id: song.id,
                        img: song.album.images[0].url,
                        uri: song.uri,
                        artists: artists
                    };
                });
                res.send(sendies);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.error(err_2 + " in searchsong");
                return [2 /*return*/, res.status(500).send("sorry about that!")];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
