import open from "open";
import Spotify from "spotify-web-api-node";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./config";
import cors from "cors";
import express, { Router } from "express";
import fs from "fs";
import { User } from "./database";
import Mongoose from "mongoose";

const route = Router();

route.use(cors());

var spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

const scopes = [
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
route.post("/login", async (req, res) => {
  try {
    const { pw, email } = req.body;
    let user = await User.findOne({ email: email, pw: pw });

    // if the user wasn't found
    // todo: implement actual registration. this is half-arsed
    if (!user) {
      user = new User({ email, pw });
      await user.save();
      console.log("user created");
      res.send("user created");
    } else {
      console.log("user found");
      res.send({ valid: true });
    }
  } catch (err) {
    console.error(err);
  }
});

// browser: goto lhost:8000/
// this will redirect to /auth
route.get("/", async (req, res) => {
  let data = await User.find({});
  console.log(data);
  res.redirect("/auth");
});

// when redirected, send user to spotify auth page
route.get("/auth", async (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes, "arstneio", true));
});

//auth. page sends auth info back to this whitelisted endpoint
route.get("/spotify/callback", async (req, res) => {
  const { error, code, state } = req.query;

  if (error) {
    console.error("Callback error: ", error);
    res.send(`callback error: ${error}`);
    return;
  }

  try {
    let data = await spotifyApi.authorizationCodeGrant(code as string); //using code to identify ourselves
    const { access_token, refresh_token } = data.body; //in return for some tokens
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    let expires_in = data.body.expires_in;

    // set an interval (~3min) after which we refresh the access token
    // for this user. this allows for perpetual action on their
    // behalf, even when they're not on the app (in theory)
    setInterval(async () => {
      try {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];
        console.log("The access token has been refreshed!");
        spotifyApi.setAccessToken(access_token);
      } catch (err) {
        console.log("Problem retrieving refresh token: ");
        console.log(err);
      }
    }, (expires_in / 2) * 100);

    res.redirect("http://localhost:3000"); //get 'back in' to frontend
  } catch (err) {
    console.error(err);
    res.send("!");
  }
});

// send user's top 5 artists
// todo: implement user-defined limit
route.get("/getArtists", async (req, res) => {
  let artists = await spotifyApi.getMyTopArtists({ limit: 5 });
  let names = artists.body.items.map((artist) => artist.name);
  res.send({ artists: names });
});

// send user's spotify id, images, and display name
route.get("/getMe", async (req, res) => {
  let me = await spotifyApi.getMe();
  let { id, images, display_name: name } = me.body;
  res.send({
    me: {
      id,
      images,
      name,
    },
  });
});

// send user's top 10 tracks
// {
//  songs: {
//    name,
//    id,
//    uri,
//    artists: [name]
//  }
// }
route.get("/getSongs", async (req, res) => {
  let songs = await spotifyApi.getMyTopTracks({ limit: 10 });
  let details = songs.body.items.map((song) => {
    let artists = song.artists.map((artist) => artist.name);
    return { name: song.name, artists, id: song.id, uri: song.uri };
  });
  res.send({ songs: details });
});

// get 5 of the user's playlists
// {
//   playlists: [{
//    name,
//    id,
//    uri,
//    img
//   }]
// }
route.get("/getPlaylists", async (req, res) => {
  let playlists = await spotifyApi.getUserPlaylists({ limit: 5 });
  // console.log(playlists.body.items[0].images[0]);
  let response = playlists.body.items.map((plist) => {
    console.log(plist);
    return {
      name: plist.name,
      id: plist.id,
      uri: plist.uri,
      img: plist.images.length > 0 ? plist.images[0].url : null,
    };
  });

  res.send({ playlists: response });
});

// update the user with the given email & pw
// todo: this is super vulnerable
route.post("/db/updateUser", async (req, res) => {
  try {
    let { pw, email, id, name } = req.body;
    await User.findOneAndUpdate(
      { pw: pw, email: email },
      { id: id, name: name },
      { new: true }
    );
    res.send("thanks, updated");
  } catch (err) {
    res.send('crap, couldn"t update');
  }
});

// get the given user's queues
route.get("/db/queues/", async (req, res) => {
  try {
    let { pw, email, id, name } = req.query;
    let user = await User.findOne({ email: email, pw: pw });
    if (user) {
      console.log(user.queues);
      res.send(user.queues);
    } else {
      return console.error("couldn't find user");
    }
  } catch (err) {
    console.log("couldn't make it to uqeues");
    console.log(err);
  }
});

route.get("db/friends", async (req, res) => {
  try {
    let { name } = req.query;
    let user = await User.findOne({ name });
    console.log(user.friends);
    res.send(user.friends);
  } catch (err) {
    console.error(err);
  }
});

route.get("db/friendRequest", async (req, res) => {
  try {
    let { from, to } = req.query;
    let fromUser = await User.findOne({ name: from });
    let toUser = await User.findOne({ name: to });
    if (!toUser) {
      res.send("user " + to + " not found");
    } else if (!fromUser) {
      res.send("this is awkward but... we don't know you");
    } else {
      await User.findOneAndUpdate({ name: from });
    }
  } catch (err) {
    console.error(err);
  }
});

// add the song with the given uri to the user's (literal) queue.
// todo: implement friend-to-friend queues via db
route.get("/addToQueue", async (req, res) => {
  let { uri } = req.query;
  let arts = await spotifyApi.addToQueue(uri as string);
  if (!arts) {
    console.error("oops, no queuesies");
    return res.send("error queueing");
  }
  res.send("queued");
});

// get the user's currently playing track
route.get("/getCurrentSong", async (req, res) => {
  try {
    let data = await spotifyApi.getMyCurrentPlayingTrack();
    console.log(data.body.item);
    let trackInfo = null;
    if (data.body.item != null) {
      trackInfo = {
        name: data.body.item.name,
        uri: data.body.item.uri,
        id: data.body.item.id,
      };
    }

    res.send(trackInfo);
  } catch (err) {
    console.log("unable to retrieve the user's currently playing track:");
    console.error(err);
  }
});

// given a song uri & playlist id,
// add the song to the playlist
route.get("/addSongToPlaylist", async (req, res) => {
  let { songUri, playlistId } = req.query;
  await spotifyApi.addTracksToPlaylist(
    playlistId as string,
    [songUri] as string[]
  );
  res.send("added song to playlist");
});

// given a query, search for it.
// todo: implement artist/song/album searching?
route.get("/searchSong", async (req, res) => {
  let { query } = req.query;
  let tracks = await spotifyApi.searchTracks(query as string, { limit: 10 });
  let sendies = tracks.body.tracks?.items.map((song) => {
    let artists = song.artists.map((artist) => artist.name);
    return {
      name: song.name,
      id: song.id,
      img: song.album.images[0].url,
      uri: song.uri,
      artists: artists,
    };
  });
  res.send(sendies);
});

// after finding the given user, export the queue with title 'title'
// to their spotify account.
//  find the playlist if it exists—create it otherwise
//  add songs to it
//  profit
route.post("/exportQueue", async (req, res) => {
  let { pw, email, title } = req.body;
  let user = await User.findOne({ email: email, pw: pw });
  let q = user.queues.filter((a: any) => a.title === title)[0];
  let uris = q.tracks.map((a: any) => a.uri);
  uris = uris.map((a: any) => a.trim());

  let queueId;
  // if (!q.hasBeenExported) {
  //   let data = await spotifyApi.createPlaylist(title)
  //    id = data.body.id
  //    console.log(title + " created")
  //    q.hasBeenExported = true
  // q.save()
  // } else {
  let data = await spotifyApi.getUserPlaylists();

  // if a playlist with title 'title' is found, add to it.
  if (data.body.items.filter((a) => a.name == title).length !== 0) {
    let q = data.body.items.filter((a) => a.name == title)[0];
    queueId = q.id;
    //otherwise, create it
  } else {
    let p = await spotifyApi.createPlaylist(title);
    queueId = p.body.id;
  }
  //this used to be in each block of the condition - not sure if
  //the changes made therein to queueId are in scope out here
  await spotifyApi.addTracksToPlaylist(queueId, uris);
  return res.send("successfully updated");
});

export default route;
