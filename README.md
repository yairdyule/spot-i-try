# **user discretion advised**

this is my attempt at a website to facilitate song-sharing between friends. 

as yet, it is still incredibly WIP — it is fairly insecure (who isn't!) and *very* barebones. 

the goal is to be able to friend people, and add songs to their 'queues', which they can then export to Spotify.

at the moment, the spotify integration is functional, but user authorization, registration, etc. are all missing.

### proceed at your own risk—lifeguard is *not* on duty!!

with all of that being said...

usage: 

- `npm i //install dependencies`
- `npm run server //start node server on http://localhost:8000`
- `npm run tsw //compile & watch .ts files`
- `cd frontend && yarn start //fire up the frontend on http://localhost:3000`

you'll want to create and register for an application on [Spotify's dev. page](https://developer.spotify.com/dashboard/login)

additionally, you'll need to sign up for a [mongodb cluster](https://account.mongodb.com/account/login)

then, create a file `.env` in the root of the project, and add the following values:

`.env`:
```
PORT="8000"
CLIENT_ID="<your spotify client id>"
CLIENT_SECRET="<your spotify client secret>"
REDIRECT_URI="http://localhost:8000/spotify/callback" //whitelist this once your app is reg'd
CORS_DOMAINS="http://localhost:3000/"
MONGO_URI="<your mongodb uri>"
```
contributions are welcomed. the app is slightly spaghetti at the moment.

thanks for stopping by, & best of luck!
