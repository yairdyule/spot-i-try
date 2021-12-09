import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useQuery } from "./hooks/useQuery";
import axios from "axios";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/a" element={<A />} />
        <Route path="/b" element={<B />} />
        <Route path="me/getMe" element={<GetMe />} />
        <Route path="me/playlists" element={<Playlists />} />
        <Route path="me/queues" element={<Queues />} />
      </Routes>
    </div>
  );
}

function Nav() {
  return (
    <nav>
      <ul className="flex flex-col">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/a">a</Link>
        </li>
        <li>
          <Link to="/b">b</Link>
        </li>
        <li>
          <Link to="/me/getMe">my details</Link>
        </li>
        <li>
          <Link to="/me/playlists">my playlists</Link>
        </li>
        <li>
          <Link to="/me/queues">my queues</Link>
        </li>
      </ul>
      <Search className="flex flex-col" />
    </nav>
  );
}

function Search() {
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleChange = async (e) => {
    e.preventDefault();
    if (input !== "") {
      let results = await axios.get("http://localhost:8000/searchSong", {
        params: { query: input },
      });
      console.log(results.data);
      setSongs(results.data);
      setLoaded(true);
    }
  };

  return (
    <div className="search">
      <form onSubmit={(e) => handleChange(e)}>
        <input
          type="text"
          placeholder="please search a song"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit"> submit me! </button>{" "}
        <button
          type="button"
          onClick={() => {
            setSongs([]);
          }}
        >
          clear!
        </button>{" "}
        {/* should i instead link to a search page? probably*/}
      </form>

      <ul>
        {loaded &&
          songs.map((song) => {
            return (
              <li className="song flex flex-row" key={song.id}>
                {song.img && (
                  <img
                    src={song.img}
                    style={{ width: "50px", height: "auto" }}
                  />
                )}
                <div>
                  <name>{song.name}</name>
                  <p>by {song.artists.join(",")} </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function Page({ children }) {
  return (
    <div className="page">
      <Nav />
      {children}
    </div>
  );
}

function GetMe() {
  const [state, setState] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getMyData = async () => {
      let data = await axios.get("http://localhost:8000/getMe");
      setState(data.data.me);
      setLoaded(true);
    };
    getMyData();
  }, []);

  let children = (
    <div>
      <h1>your info</h1>
      {loaded && (
        <>
          <h1>{state.name}</h1>
          <img src={state.images[0].url} />
        </>
      )}
    </div>
  );
  return <Page children={children} />;
}

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPlaylists = async () => {
      let data = await axios.get("http://localhost:8000/getPlaylists");
      console.log(data);
      setPlaylists(data.data.playlists);
      setLoaded(true);
    };
    getPlaylists();
  }, []);

  let children = (
    <div>
      <h1>Your playlists</h1>
      {loaded && (
        <ul>
          {playlists.map((p) => {
            return (
              <li key={p.uri}>
                {p.img !== null && (
                  <img src={p.img} style={{ width: "100px", height: "auto" }} />
                )}
                {p.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return <Page children={children} />;
}

function Queues() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    async function fetchQueues() {
      let data = await axios.get("http://localhost:8000/db/queues");
      console.log(data);
    }

    fetchQueues();
  }, []);

  return <Page children={<h1>your queues</h1>} />;
}

function Home() {
  return <Page children={<h1>Homepage</h1>} />;
}

function A() {
  const [state, setState] = useState("");
  async function getHi() {
    let data = await axios.get("http://localhost:8000/getHi");
    setState(data.data);
  }
  let Button = <button onClick={getHi}>get hi</button>;
  let Children = (
    <div>
      <h1>{state}</h1>
      {Button}
    </div>
  );
  return <Page children={Children} />;
}

function B() {
  return <Page children={<h1>B!</h1>} />;
}

export default App;
