import SpotifyWebApi from "spotify-web-api-node";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const db = new PrismaClient();
const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
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

const router = Router();

// route: /spotify/
router.get("/", async (req, res) => {
  console.log("receieved a req");
  res.redirect("/spotify/auth");
});

// /spotify/auth
router.get("/auth", async (req, res) => {
  res.redirect(api.createAuthorizeURL(scopes, "arstneio", true));
});

// /spotify/callback
router.get("/callback", async (req, res) => {
  const { error, code, state } = req.query;

  if (error) {
    return res.status(400).send({
      success: false,
      msg: "failed to authenticate with spotify's API",
    });
  }

  try {
    let auth = await api.authorizationCodeGrant(code as string);
    let { access_token, refresh_token, expires_in } = auth.body;
    api.setAccessToken(access_token);
    api.setRefreshToken(refresh_token);

    // set an interval (~3min) after which we refresh the access token
    // for this user. this allows for perpetual action on their
    // behalf, even when they're not on the app (in theory)
    setInterval(async () => {
      try {
        const data = await api.refreshAccessToken();
        const access_token = data.body["access_token"];
        console.log("The access token has been refreshed!");
        api.setAccessToken(access_token);
      } catch (err) {
        console.log("Problem retrieving refresh token: ");
        console.log(err);
      }
    }, (expires_in / 2) * 100);

    res.redirect("http://localhost:3000"); //get 'back in' to frontend
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      msg: "failed to authenticate with spotify's api",
    });
  }
});

router.get("/searchSong", async (req, res) => {
  try {
    let { query } = req.query;
    if (query?.length == 0) {
      return res.send([]);
    }
    let tracks = await api.searchTracks(query as string, { limit: 10 });
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
  } catch (err) {
    console.error(err + " in searchsong");
    return res.status(500).send("sorry about that!");
  }
});

router.get("/setPlayback", async (req, res) => {
  try {
    let { id } = req.query;
    // let setPlay = await api. wait hold up doesn't look like there's an endpoint for that
  } catch (err) {
    console.error(err + " in setPlayback");
    return res.status(500).send("sorry about that!");
  }
});

//create q in the db for this user
//doesn't *have* to go to somebody, but can
//need:
// - user id
// - friend's id?
// - queue title
// - queue description
router.post("/createQueue", async (req, res) => {
  try {
    let { userId, title, description = null, friendId = null } = req.body;
    let results;
    if (friendId) {
      results = await db.queue.create({
        data: {
          title: title,
          description: description,
          sentBy: userId,
          sentTo: friendId,
        },
      });
    } else {
      results = await db.queue.create({
        data: {
          title: title,
          description: description,
          sentBy: userId,
        },
      });
    }
    res.send({
      success: true,
      queue: results,
      msg: "successfully created queue",
    });
  } catch (err) {
    console.error(err + " in createQueue");
    return res
      .status(500)
      .send({ success: false, msg: "error creating queue" });
  }
});

//add track(s) to an extant queue
//need:
// - track id(s)
// - user id
// - queue id
router.post("/addToQueue", async (req, res) => {
  let {
    userId,
    queueId,
    trackArr,
  }: { userId: number; queueId: number; trackArr: string[] } = req.body;

  //search track ids w/ spotify to get data (name, artists, etc)
  let tracks;
  let trackDetails;
  if (trackArr.length > 1) {
    tracks = await api.getTracks(trackArr);
    trackDetails = tracks.body.tracks.map((track) => ({
      id: track.id,
      uri: track.uri,
      href: track.href,
      artists: track.artists,
      albumCover: track.album.images[0], //widest, perhaps get last index for smallest?
    }));
  } else {
    tracks = await api.getTrack(trackArr[0]);
    trackDetails = {
      id: tracks.body.id,
      uri: tracks.body.uri,
      href: tracks.body.href,
      artists: tracks.body.artists,
      albumCover: tracks.body.album.images[0], //widest, perhaps get last index for smallest?
    };
  }

  console.log("tracks filtered from spotify api response");
  console.log(trackDetails);

  //then, add them to the user/queue's content field
});

//list a user's incoming queues
//need:
// - user id
// - ?
router.post("/listIncomingQueues", async (req, res) => {
  try {
    let { userId } = req.body;

    let queues = await db.queue.findMany({
      where: {
        sentTo: userId,
      },
    });

    res.send({ success: true, queues: queues });
  } catch (err) {
    console.error(err + " in createQueue");
    return res
      .status(500)
      .send({ success: false, msg: "error fetching incoming queues" });
  }
});

//list a user's outgoing queues
//need:
// - user id
// - ?
router.post("/listOutgoingQueues", async (req, res) => {
  try {
    let { userId } = req.body;

    let queues = await db.queue.findMany({
      where: {
        sentBy: userId,
      },
    });

    res.send({ success: true, queues: queues });
  } catch (err) {
    console.error(err + " in createQueue");
    return res
      .status(500)
      .send({ success: false, msg: "error fetching outgoing queues" });
  }
});

//export an incoming queue (allow for outgoing too?)
//need:
// - user id
// - queue id
router.get("/exportQueue", async (req, res) => {
  let { userId, queueId } = req.body;
  //get queue details (title, desc, content) from db
  let queueDetails = await db.queue.findUnique({
    where: {
      id: queueId,
    },
    select: {
      content: true,
      title: true,
      description: true,
    },
  });

  let trackIds = queueDetails?.content.map((song) => ({
    id: song.id,
  }));

  //export it to spotify.
  // - check if it exists already - if so, add tracks that aren't in it alr
  let playlists = await api.getUserPlaylists();
  let alreadyExists = playlists.body.items.filter(
    (plist) => plist.name == queueDetails?.title
  );
  if (alreadyExists) {
    //...
  } else {
    let data = api
      .createPlaylist(queueDetails?.title as string, {
        description: queueDetails?.description,
      })
      .then(async (createdPlaylist) => {
        await api.addTracksToPlaylist(
          createdPlaylist.body.id,
          trackIds as string[]
        );
      });
  }
  // - if not... add whole thing
});

export default router;
