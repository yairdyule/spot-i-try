import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Input } from "./components/Input";
// import { Login } from "./components/Login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  //   const [loggedIn, setLoggedIn] = useState(false); //display full page if user logged in
  //   const [email, setEmail] = useState(""); // email, pw, query form control
  //   const [pw, setPw] = useState("");
  //   const [query, setQuery] = useState("");
  //   const [queues, setQueues] = useState([]); // store user's queues once fetched
  //   const [state, setState] = useState({}); // badly named - stores user info from /getMe
  //   const [artists, setArtists] = useState([]); //store user's top artists
  //   const [songs, setSongs] = useState([]); //store their top songs
  //   const [playlists, setPlists] = useState([]); //store their playlists
  //   const [currentSong, setCurrentSong] = useState(""); //"" currently playing song
  //   const [clipboard, setClipboard] = useState({ hasCopied: false, uri: "" }); //store uri of 'copied' song
  //
  //   useEffect(() => {
  //     if (loggedIn) {
  //       async function fetchPlaylists() {
  //         try {
  //           const response = await axios.get(
  //             "http://localhost:8000/getPlaylists"
  //           );
  //           setPlists(response.data.playlists);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //       fetchPlaylists();
  //
  //       async function fetchMe() {
  //         try {
  //           const response = await axios.get("http://localhost:8000/getMe");
  //           // const response2 = await axios.post("http://localhost:8000/login");
  //           //update user's account on fetch
  //           //kinda hacky - certainly a better way todo
  //           await axios.post("http://localhost:8000/db/updateUser", {
  //             pw: pw,
  //             email: email,
  //             id: response.data.me.id,
  //             name: response.data.me.name,
  //           });
  //           setState(response.data.me);
  //         } catch (err) {
  //           console.error(err);
  //           setState({});
  //         }
  //       }
  //       fetchMe();
  //
  //       async function fetchArtists() {
  //         try {
  //           const response = await axios.get("http://localhost:8000/getArtists");
  //           setArtists(response.data.artists);
  //         } catch (err) {
  //           console.error(err);
  //           setArtists([]);
  //         }
  //       }
  //       fetchArtists();
  //
  //       async function fetchSongs() {
  //         try {
  //           const response = await axios.get("http://localhost:8000/getSongs");
  //           setSongs(response.data.songs);
  //         } catch (err) {
  //           console.error(err);
  //         }
  //       }
  //       fetchSongs();
  //
  //       async function getCurrentSong() {
  //         try {
  //           const response = await axios.get(
  //             "http://localhost:8000/getCurrentSong"
  //           );
  //           console.log(response.data);
  //           setCurrentSong(response.data);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //       getCurrentSong();
  //     }
  //   }, [loggedIn]);
  //
  //   async function queueSong(uri) {
  //     await axios.get("http://localhost:8000/addToQueue", {
  //       params: { uri },
  //     });
  //   }
  //
  //   async function copyUri(uri) {
  //     setClipboard({ hasCopied: true, uri: uri });
  //   }
  //
  //   async function addSongToPlaylist(songUri, playlistId) {
  //     await axios.get("http://localhost:8000/addSongToPlaylist", {
  //       params: { songUri, playlistId },
  //     });
  //   }
  //
  //   async function listQueues(pw, email, name, id) {
  //     let data = await axios.get("http://localhost:8000/db/queues", {
  //       params: { pw, email, name, id },
  //     });
  //     setQueues(data.data);
  //   }
  //
  //   const setPassword = (txt) => {
  //     setPw(txt);
  //   };
  //
  //   const [isGoodForm, setIsGoodForm] = useState(true);
  //   const handleSubmit = async (e, pw, email) => {
  //     e.preventDefault();
  //     if (isGoodForm) {
  //       let data = await axios.post("http://localhost:8000/", { pw, email });
  //       if (data.data.user) {
  //         setLoggedIn(true);
  //       }
  //       setIsGoodForm(true);
  //     } else {
  //       setIsGoodForm(false);
  //     }
  //   };
  //
  //   async function exportQueue(queue, pw, email) {
  //     let ids = queue.tracks.map((track) => track.id);
  //     await axios.post("http://localhost:8000/exportQueue", {
  //       title: queue.title,
  //       ids: ids,
  //       pw: pw,
  //       email: email,
  //     });
  //   }
  //
  //   async function searchSong(query) {
  //     let data = await axios.get("http://localhost:8000/searchSong", {
  //       params: { query: query },
  //     });
  //     return data.data;
  //   }
  //
  //   const [searchResults, setSearchResults] = useState([]);
  //   const handleSearch = async (e) => {
  //     e.preventDefault();
  //     let data = await searchSong(query);
  //     setSearchResults(data);
  //     setQuery("");
  //   };
  //   function NotLoggedIn() {
  //     return (
  //       <div className="App">
  //         <Login />
  //       </div>
  //     );
  //   }
  //
  //   function IsLoggedIn() {
  //     return (
  //       <div className="App">
  //         {state.name ? <h1>Howdy, {state.name}</h1> : <h1>Hi, stranger!</h1>}
  //         {currentSong && (
  //           <div className="currently-playing">
  //             <h3>We hope you're enjoying {currentSong.name}</h3>
  //           </div>
  //         )}
  //         <div className="flex flex-row">
  //           <div className="flex flex-col">
  //             <h2>Top Artists</h2>
  //             <ul>
  //               {artists.map((artist, index) => {
  //                 return <li key={index}>{artist}</li>;
  //               })}
  //             </ul>
  //           </div>
  //           <div className="flex flex-col">
  //             <h2>Top Songs</h2>
  //             <ul className="list">
  //               {songs.map((song, ind) => {
  //                 return (
  //                   <li key={ind} className="song">
  //                     {song.name} - {song.artists.join()}
  //                     <div className="buttons">
  //                       <button onClick={() => queueSong(song.uri)}>
  //                         Add to queue
  //                       </button>
  //                       <button onClick={() => copyUri(song.uri)}>
  //                         Copy song
  //                       </button>
  //                     </div>
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           </div>
  //           <div className="flex flex-col">
  //             <h2>Playlists</h2>
  //             <ul>
  //               {playlists.map((playlist, ind) => {
  //                 return (
  //                   <li key={ind}>
  //                     {playlist.name}
  //                     {clipboard.hasCopied && (
  //                       <button
  //                         onClick={() => {
  //                           addSongToPlaylist(clipboard.uri, playlist.id);
  //                         }}
  //                       >
  //                         Add song to playlist
  //                       </button>
  //                     )}
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           </div>
  //         </div>
  //         <div className="flex flex-row">
  //           <div className="flex flex-col">
  //             <h4>search a song</h4>
  //             <form onSubmit={(e) => handleSearch(e)}>
  //               <label>
  //                 {" "}
  //                 query:
  //                 <input
  //                   type="text"
  //                   name="email"
  //                   value={query}
  //                   onChange={(e) => {
  //                     setQuery(e.target.value);
  //                   }}
  //                 />
  //               </label>
  //               <input type="submit" value="submit"></input>
  //             </form>
  //             <ul>
  //               {searchResults.map((song, index) => {
  //                 return (
  //                   <li key={index}>
  //                     {song.name} - {song.artists.join()} (uri: {song.uri})
  //                     <button onClick={() => queueSong(song.uri)}>
  //                       Add to queue
  //                     </button>
  //                     <button onClick={() => copyUri(song.uri)}>Copy song</button>
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           </div>
  //         </div>
  //
  //         <div>
  //           <button
  //             onClick={() => {
  //               listQueues(pw, email, state.name, state.id);
  //             }}
  //           >
  //             List your queues!
  //           </button>
  //           {queues.map((queue) => {
  //             return (
  //               <div>
  //                 <h3>incoming queue: {queue.title}</h3>
  //                 <ul>
  //                   {queue.tracks.map((track, ind) => {
  //                     return (
  //                       <li key={ind}>
  //                         {track.name} -{" "}
  //                         {track.artists.map((artist) => artist.name).join()}{" "}
  //                       </li>
  //                     );
  //                   })}
  //                 </ul>
  //                 <button onClick={() => exportQueue(queue, pw, email)}>
  //                   Export
  //                 </button>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   }
  // return loggedIn ? <IsLoggedIn /> : <Login />;
  return (
    <Router>
      <div>
        <Link to="/">Welcome</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/Home">Home</Link>
      </div>

      <Routes>
        <Route exact path="/">
          <h1>sucessfully hit /</h1>
        </Route>
        <Route path="/login">
          <h1>logging in</h1>
        </Route>
        <Route path="/home">
          <h1>got home</h1>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
