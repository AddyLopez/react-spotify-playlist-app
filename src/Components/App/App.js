import React, { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("Playlist Title");
  const [playlist, setPlaylist] = useState([
    "track_one",
    "track_two",
    "track_three",
  ]);

  return (
    <div className="App">
      <header>
        <h1>React Spotify Playlist Application</h1>
        <p>Future info about how to use this app.</p>
        <SearchBar />
      </header>
      <main>
        <SearchResults searchResults={searchResults} />
        <Playlist playlistTitle={playlistTitle} playlist={playlist} />
      </main>
    </div>
  );
}

export default App;
