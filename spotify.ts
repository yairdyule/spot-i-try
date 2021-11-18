import Spotify from "spotify-web-api-node"
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './config'

import {Router} from 'express'

const route = Router()

var spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI 
})

const scopes = ['user-read-private', 'user-read-email', "user-read-currently-playing", "user-top-read"]

// route.get('/', (req, res) => {
//   res.send("my (aka spotify's) swamp")
// })

route.get('/', (req, res) => {
  console.log('1')
  res.redirect(spotifyApi.createAuthorizeURL(scopes, "arstneio", true))
})


route.get('/spotify/callback', async (req, res) => {
  console.log('2')
  const {error, code, state } = req.query;

  if (error) {
    console.error('Callback error: ', error)
    res.send(`callback error: ${error}`)
    return
  }

  try {
    let data = await spotifyApi.authorizationCodeGrant(code as string)
    console.log('3')
    const {access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token)
    spotifyApi.setRefreshToken(refresh_token)

    let expires_in = data.body.expires_in
    console.log(expires_in)
    console.log(`got ur token—expires in ${Math.floor((expires_in - new Date().getTime() / 1000))} seconds!`)

    console.log('doing shit in ' + expires_in/2*100 + 'seconds (?)')

    setInterval(async () => {
      try{
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
        spotifyApi.getMe().then((data) => {
          console.log(data.body.display_name)
        })
      } catch (err) {
        console.log('problem retrieving refresh thingy: ' + err)
      }
    }, expires_in / 2 * 100);

    res.send('ooooo he in it')


  } catch (err) {
    console.error(err);
    res.send('shit!')
  }
  console.log('4')
  spotifyApi.getMyTopArtists()
    .then(function(data) {
      let topArtists = data.body.items;
      topArtists.forEach((artist) => {
        console.log(artist.name)
      })
    }, function(err) {
      console.log('Something went wrong!', err);
    });

  /* Get a User’s Top Tracks*/
  spotifyApi.getMyTopTracks()
    .then(function(data) {
      let topTracks = data.body.items;
      topTracks.forEach((track) => {
        console.log(track.name + ' - ' + track.artists[0].name)
      })
    }, function(err) {
      console.log('Something went wrong!', err);
    });

})

export default route
