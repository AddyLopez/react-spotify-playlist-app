import React, { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import { Spotify } from "../../util/Spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("Playlist Title");
  const [playlist, setPlaylist] = useState([]);

  const addTrack = (newTrack) => {
    const trackExists = playlist.find(
      (savedTrack) => savedTrack.id === newTrack.id
    );
    const trackIsNew = playlist.concat(newTrack);
    if (trackExists) {
      console.log("Track is already on this playlist.");
    } else {
      setPlaylist(trackIsNew);
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
    Spotify.savePlaylist(playlistTitle, trackURIs)
      .then(() => {
        setPlaylistTitle("New Playlist");
        setPlaylist([]);
      })
      .catch((error) => {
        console.error(`Error saving playlist: ${error}`);
      });
  };

  const search = (searchTerm) => {
    Spotify.search(searchTerm).then((results) => {
      setSearchResults(results);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>React Spotify Playlist Application</h1>
        <p>Future info about how to use this app.</p>
        <SearchBar onSearch={search} />
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
