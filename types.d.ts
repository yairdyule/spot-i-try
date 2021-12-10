//for environment variable configuration
export interface Config {
  SPOTIFY_CLIENT_ID: string | undefined;
  SPOTIFY_CLIENT_SECRET: string | undefined;
  SPOTIFY_REDIRECT_URI: string | undefined;
  DB_USER: string | undefined;
  DB_HOST: string | undefined;
  DB_DATABASE: string | undefined; //lol
  DB_PASSWORD: string | undefined;
  DB_PORT: number | undefined;
}

//user returned from db
export interface User {
  user_id: number;
  username: string;
}

export interface Queue {
  queue_id: number;
  recipient_id: number;
  sender_id: number;
  queue_name: string;
}

export interface QueueContents {
  queue_id: number;
  song_name: string;
  song_artist: string; //should be array of artist names?
  song_id: string; //returned from spotify api
  song_uri: string; // "     "
}

export interface Relation {
  user1_id: number;
  user2_id: number;
  pending: boolean;
}
