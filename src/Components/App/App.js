import React, { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>React Spotify Playlist Application</h1>
        <p>Future info about how to use this app.</p>
        <SearchBar />
      </header>
      <main>
        <SearchResults searchResults={searchResults} />
        <Playlist />
      </main>
    </div>
  );
}

export default App;
