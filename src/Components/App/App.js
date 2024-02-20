import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";

function App() {
  return (
    <div className="App">
      <header>
        <h1>React Spotify Playlist Application</h1>
        <p>Future info about how to use this app.</p>
        <SearchBar />
      </header>
      <main>
        <SearchResults />
        <Playlist />
      </main>
    </div>
  );
}

export default App;
