import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); //display full page if user logged in
  const [email, setEmail] = useState(""); // email, pw, query form control
  const [pw, setPw] = useState("");
  const [query, setQuery] = useState("");
  const [queues, setQueues] = useState([]); // store user's queues once fetched
  const [state, setState] = useState({}); // badly named - stores user info from /getMe
  const [artists, setArtists] = useState([]); //store user's top artists
  const [songs, setSongs] = useState([]); //store their top songs
  const [playlists, setPlists] = useState([]); //store their playlists
  const [currentSong, setCurrentSong] = useState(""); //"" currently playing song
  const [clipboard, setClipboard] = useState({ hasCopied: false, uri: "" }); //store uri of 'copied' song

  useEffect(() => {
    if (loggedIn) {
      async function fetchPlaylists() {
        try {
          const response = await axios.get(
            "http://localhost:8000/getPlaylists"
          );
          setPlists(response.data.playlists);
        } catch (error) {
          console.error(error);
        }
      }
      fetchPlaylists();

      async function fetchMe() {
        try {
          const response = await axios.get("http://localhost:8000/getMe");
          //update user's account on fetch
          //kinda hacky - certainly a better way todo
          await axios.post("http://localhost:8000/db/updateUser", {
            pw: pw,
            email: email,
            id: response.data.me.id,
            name: response.data.me.name,
          });
          setState(response.data.me);
        } catch (err) {
          console.error(err);
          setState({});
        }
      }
      fetchMe();

      async function fetchArtists() {
        try {
          const response = await axios.get("http://localhost:8000/getArtists");
          setArtists(response.data.artists);
        } catch (err) {
          console.error(err);
          setArtists([]);
        }
      }
      fetchArtists();

      async function fetchSongs() {
        try {
          const response = await axios.get("http://localhost:8000/getSongs");
          setSongs(response.data.songs);
        } catch (err) {
          console.error(err);
        }
      }
      fetchSongs();

      async function getCurrentSong() {
        try {
          const response = await axios.get(
            "http://localhost:8000/getCurrentSong"
          );
          setCurrentSong(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      getCurrentSong();
    }
  }, [loggedIn]);

  async function queueSong(uri) {
    await axios.get("http://localhost:8000/addToQueue", {
      params: { uri },
    });
  }

  async function copyUri(uri) {
    setClipboard({ hasCopied: true, uri: uri });
  }

  async function addSongToPlaylist(songUri, playlistId) {
    await axios.get("http://localhost:8000/addSongToPlaylist", {
      params: { songUri, playlistId },
    });
  }

  async function listQueues(pw, email, name, id) {
    let data = await axios.get("http://localhost:8000/db/queues", {
      params: { pw, email, name, id },
    });
    setQueues(data.data);
  }

  const setPassword = (txt) => {
    setPw(txt);
  };

  const [isGoodForm, setIsGoodForm] = useState(true);
  const handleSubmit = async (e, pw, email) => {
    e.preventDefault();
    if (isGoodForm) {
      let data = await axios.post("http://localhost:8000/", { pw, email });
      if (data.data.user) {
        setLoggedIn(true);
      }
      setIsGoodForm(true);
    } else {
      setIsGoodForm(false);
    }
  };

  async function exportQueue(queue, pw, email) {
    let ids = queue.tracks.map((track) => track.id);
    await axios.post("http://localhost:8000/exportQueue", {
      title: queue.title,
      ids: ids,
      pw: pw,
      email: email,
    });
  }

  async function searchSong(query) {
    let data = await axios.get("http://localhost:8000/searchSong", {
      params: { query: query },
    });
    return data.data;
  }

  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    let data = await searchSong(query);
    setSearchResults(data);
    setQuery("");
  };
  function NotLoggedIn() {
    return (
      <div className="App">
        <h1>Please log in!</h1>
        <form onSubmit={(e) => handleSubmit(e, pw, email)}>
          <label>
            {" "}
            email:
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label>
            {" "}
            pw:
            <input
              type="password"
              name="pw"
              value={pw}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <input type="submit" value="submit"></input>
        </form>
      </div>
    );
  }

  function IsLoggedIn() {
    return (
      <div className="App">
        <h1>
          We hope you're enjoying {currentSong}, {state.name}.
        </h1>

        {
          //artists
        }
        <h2>Top Artists</h2>
        <ul>
          {artists.map((artist, index) => {
            return <li key={index}>{artist}</li>;
          })}
        </ul>

        <h2>Top Songs</h2>
        <ul>
          {songs.map((song, ind) => {
            return (
              <li key={ind}>
                {song.name} - {song.artists.join()}
                <button onClick={() => queueSong(song.uri)}>
                  Add to queue
                </button>
                <button onClick={() => copyUri(song.uri)}>Copy song</button>
              </li>
            );
          })}
        </ul>

        <h2>Playlists</h2>
        <ul>
          {playlists.map((playlist, ind) => {
            return (
              <li key={ind}>
                {playlist.name}
                {clipboard.hasCopied && (
                  <button
                    onClick={() => {
                      addSongToPlaylist(clipboard.uri, playlist.id);
                    }}
                  >
                    Add song to playlist
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <div>
          <h4>search a song</h4>
          <form onSubmit={(e) => handleSearch(e)}>
            <label>
              {" "}
              query:
              <input
                type="text"
                name="email"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </label>
            <input type="submit" value="submit"></input>
          </form>
          <ul>
            {searchResults.map((song, index) => {
              return (
                <li key={index}>
                  {song.name} - {song.artists.join()} (uri: {song.uri})
                  <button onClick={() => queueSong(song.uri)}>
                    Add to queue
                  </button>
                  <button onClick={() => copyUri(song.uri)}>Copy song</button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <button
            onClick={() => {
              listQueues(pw, email, state.name, state.id);
            }}
          >
            List your queues!
          </button>
          {queues.map((queue) => {
            return (
              <div>
                <h3>incoming queue: {queue.title}</h3>
                <ul>
                  {queue.tracks.map((track, ind) => {
                    return (
                      <li key={ind}>
                        {track.name} -{" "}
                        {track.artists.map((artist) => artist.name).join()}{" "}
                      </li>
                    );
                  })}
                </ul>
                <button onClick={() => exportQueue(queue, pw, email)}>
                  Export
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <>{loggedIn ? <IsLoggedIn /> : <NotLoggedIn />}</>;
}

export default App;
