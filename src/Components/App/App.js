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

  const addTrack = (newTrack) => {
    if (playlist.some((savedTrack) => savedTrack.id === newTrack.id)) {
      return;
    } else {
      setPlaylist((previous) => {
        [...previous, track];
      });
    }
  };

  const deleteTrack = (track) => {
    setPlaylist((playlist) => {
      playlist.filter((savedTrack) => savedTrack.id !== track.id);
    });
  };

  const updatePlaylistTitle = (newTitle) => {
    setPlaylistTitle(newTitle);
  };

  const savePlaylist = () => {
    const trackURIs = playlist.map((track) => track.uri);
  };

  return (
    <div className="App">
      <header>
        <h1>React Spotify Playlist Application</h1>
        <p>Future info about how to use this app.</p>
        <SearchBar />
      </header>
      <main>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistTitle={playlistTitle}
          playlist={playlist}
          onDelete={deleteTrack}
          onSave={savePlaylist}
          onTitleChange={updatePlaylistTitle}
        />
      </main>
    </div>
  );
}

export default App;
