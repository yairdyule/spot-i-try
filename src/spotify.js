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
Object.defineProperty(exports, "__esModule", { value: true });
var spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
var config_1 = require("./config");
var cors_1 = __importDefault(require("cors"));
var express_1 = require("express");
var database_1 = require("./database");
var route = (0, express_1.Router)();
route.use((0, cors_1.default)());
var spotifyApi = new spotify_web_api_node_1.default({
    clientId: config_1.CLIENT_ID,
    clientSecret: config_1.CLIENT_SECRET,
    redirectUri: config_1.REDIRECT_URI,
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
//send to authorization page
route.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pw, email, user, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, pw = _a.pw, email = _a.email;
                return [4 /*yield*/, database_1.User.findOne({ email: email, pw: pw })];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                user = new database_1.User({ email: email, pw: pw });
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                console.log("user created");
                return [3 /*break*/, 4];
            case 3:
                console.log("user found");
                _b.label = 4;
            case 4:
                res.send({ user: true });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.error(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// browser: goto lhost:8000/
// this will redirect to /auth
route.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.User.find({})];
            case 1:
                data = _a.sent();
                console.log(data);
                res.redirect("/auth");
                return [2 /*return*/];
        }
    });
}); });
// when redirected, send user to spotify auth page
route.get("/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.redirect(spotifyApi.createAuthorizeURL(scopes, "arstneio", true));
        return [2 /*return*/];
    });
}); });
//auth. page sends auth info back to this whitelisted endpoint
route.get("/spotify/callback", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error, code, state, data, _b, access_token, refresh_token, expires_in, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, error = _a.error, code = _a.code, state = _a.state;
                if (error) {
                    console.error("Callback error: ", error);
                    res.send("callback error: " + error);
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, spotifyApi.authorizationCodeGrant(code)];
            case 2:
                data = _c.sent();
                _b = data.body, access_token = _b.access_token, refresh_token = _b.refresh_token;
                spotifyApi.setAccessToken(access_token);
                spotifyApi.setRefreshToken(refresh_token);
                expires_in = data.body.expires_in;
                // set an interval (~3min) after which we refresh the access token
                // for this user. this allows for perpetual action on their
                // behalf, even when they're not on the app (in theory)
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var data_1, access_token_1, err_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, spotifyApi.refreshAccessToken()];
                            case 1:
                                data_1 = _a.sent();
                                access_token_1 = data_1.body["access_token"];
                                console.log("The access token has been refreshed!");
                                spotifyApi.setAccessToken(access_token_1);
                                return [3 /*break*/, 3];
                            case 2:
                                err_3 = _a.sent();
                                console.log("Problem retrieving refresh token: ");
                                console.log(err_3);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, (expires_in / 2) * 100);
                res.redirect("http://localhost:3000"); //get 'back in' to frontend
                return [3 /*break*/, 4];
            case 3:
                err_2 = _c.sent();
                console.error(err_2);
                res.send("!");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// send user's top 5 artists
// todo: implement user-defined limit
route.get("/getArtists", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var artists, names;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, spotifyApi.getMyTopArtists({ limit: 5 })];
            case 1:
                artists = _a.sent();
                names = artists.body.items.map(function (artist) { return artist.name; });
                res.send({ artists: names });
                return [2 /*return*/];
        }
    });
}); });
// send user's spotify id, images, and display name
route.get("/getMe", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var me, _a, id, images, name;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, spotifyApi.getMe()];
            case 1:
                me = _b.sent();
                _a = me.body, id = _a.id, images = _a.images, name = _a.display_name;
                res.send({
                    me: {
                        id: id,
                        images: images,
                        name: name,
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
// send user's top 10 tracks
// {
//  songs: {
//    name,
//    id,
//    uri,
//    artists: [name]
//  }
// }
route.get("/getSongs", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songs, details;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, spotifyApi.getMyTopTracks({ limit: 10 })];
            case 1:
                songs = _a.sent();
                details = songs.body.items.map(function (song) {
                    var artists = song.artists.map(function (artist) { return artist.name; });
                    return { name: song.name, artists: artists, id: song.id, uri: song.uri };
                });
                res.send({ songs: details });
                return [2 /*return*/];
        }
    });
}); });
// get 5 of the user's playlists
// {
//   playlists: [{
//    name,
//    id,
//    uri
//   }]
// }
route.get("/getPlaylists", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlists, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, spotifyApi.getUserPlaylists({ limit: 5 })];
            case 1:
                playlists = _a.sent();
                playlists.body.items.map(function (p) { return p.name; });
                response = playlists.body.items.map(function (plist) {
                    return {
                        name: plist.name,
                        id: plist.id,
                        uri: plist.uri,
                    };
                });
                res.send({ playlists: response });
                return [2 /*return*/];
        }
    });
}); });
// update the user with the given email & pw
// todo: this is super vulnerable
route.post("/db/updateUser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pw, email, id, name_1, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, pw = _a.pw, email = _a.email, id = _a.id, name_1 = _a.name;
                return [4 /*yield*/, database_1.User.findOneAndUpdate({ pw: pw, email: email }, { id: id, name: name_1 }, { new: true })];
            case 1:
                _b.sent();
                res.send("thanks, updated");
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.send('crap, couldn"t update');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get the given user's queues
route.get("/db/queues/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pw, email, id, name_2, user, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, pw = _a.pw, email = _a.email, id = _a.id, name_2 = _a.name;
                return [4 /*yield*/, database_1.User.findOne({ email: email, pw: pw })];
            case 1:
                user = _b.sent();
                res.send(user.queues);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                console.log("couldn't make it to uqeues");
                console.log(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// add the song with the given uri to the user's (literal) queue.
// todo: implement friend-to-friend queues via db
route.get("/addToQueue", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uri, arts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uri = req.query.uri;
                return [4 /*yield*/, spotifyApi.addToQueue(uri)];
            case 1:
                arts = _a.sent();
                if (!arts) {
                    console.error("oops, no queuesies");
                    return [2 /*return*/, res.send("error queueing")];
                }
                res.send("queued");
                return [2 /*return*/];
        }
    });
}); });
// get the user's currently playing track
route.get("/getCurrentSong", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var song, response, err_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, spotifyApi.getMyCurrentPlayingTrack()];
            case 1:
                song = _b.sent();
                response = (_a = song.body.item) === null || _a === void 0 ? void 0 : _a.name;
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                console.log("unable to retrieve the user's currently playing track:");
                console.error(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// given a song uri & playlist id,
// add the song to the playlist
route.get("/addSongToPlaylist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, songUri, playlistId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, songUri = _a.songUri, playlistId = _a.playlistId;
                return [4 /*yield*/, spotifyApi.addTracksToPlaylist(playlistId, [songUri])];
            case 1:
                _b.sent();
                res.send("added song to playlist");
                return [2 /*return*/];
        }
    });
}); });
// given a query, search for it.
// todo: implement artist/song/album searching?
route.get("/searchSong", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, tracks, sendies;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                query = req.query.query;
                return [4 /*yield*/, spotifyApi.searchTracks(query, { limit: 10 })];
            case 1:
                tracks = _b.sent();
                sendies = (_a = tracks.body.tracks) === null || _a === void 0 ? void 0 : _a.items.map(function (song) {
                    var artists = song.artists.map(function (artist) { return artist.name; });
                    return {
                        name: song.name,
                        id: song.id,
                        uri: song.uri,
                        artists: artists,
                    };
                });
                res.send(sendies);
                return [2 /*return*/];
        }
    });
}); });
// after finding the given user, export the queue with title 'title'
// to their spotify account.
//  find the playlist if it exists—create it otherwise
//  add songs to it
//  profit
route.post("/exportQueue", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pw, email, title, user, q, uris, queueId, data, q_1, p;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, pw = _a.pw, email = _a.email, title = _a.title;
                return [4 /*yield*/, database_1.User.findOne({ email: email, pw: pw })];
            case 1:
                user = _b.sent();
                q = user.queues.filter(function (a) { return a.title === title; })[0];
                uris = q.tracks.map(function (a) { return a.uri; });
                uris = uris.map(function (a) { return a.trim(); });
                return [4 /*yield*/, spotifyApi.getUserPlaylists()];
            case 2:
                data = _b.sent();
                if (!(data.body.items.filter(function (a) { return a.name == title; }).length !== 0)) return [3 /*break*/, 3];
                q_1 = data.body.items.filter(function (a) { return a.name == title; })[0];
                queueId = q_1.id;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, spotifyApi.createPlaylist(title)];
            case 4:
                p = _b.sent();
                queueId = p.body.id;
                _b.label = 5;
            case 5: 
            //this used to be in each block of the condition - not sure if
            //the changes made therein to queueId are in scope out here
            return [4 /*yield*/, spotifyApi.addTracksToPlaylist(queueId, uris)];
            case 6:
                //this used to be in each block of the condition - not sure if
                //the changes made therein to queueId are in scope out here
                _b.sent();
                return [2 /*return*/, res.send("successfully updated")];
        }
    });
}); });
exports.default = route;
