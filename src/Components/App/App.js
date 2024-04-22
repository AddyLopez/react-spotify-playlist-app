import React, { useState, useCallback } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("Playlist Title");
  const [playlist, setPlaylist] = useState([]);

  const addTrack = useCallback(
    (newTrack) => {
      if (playlist.some((savedTrack) => savedTrack.id === newTrack.id)) {
        return;
      } else {
        setPlaylist((previous) => {
          return [...previous, newTrack];
        });
      }
    },
    [playlist]
  );

  const deleteTrack = useCallback((track) => {
    setPlaylist((playlist) => {
      playlist.filter((savedTrack) => savedTrack.id !== track.id);
    });
  }, []);

  const updatePlaylistTitle = useCallback((newTitle) => {
    setPlaylistTitle(newTitle);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackURIs = playlist.map((track) => track.uri);
    Spotify.savePlaylist(playlistTitle, trackURIs)
      .then(() => {
        setPlaylistTitle("New Playlist");
        setPlaylist([]);
      })
      .catch((error) => {
        console.error(`Error saving playlist: ${error}`);
      });
  }, [playlistTitle, playlist]);

  const search = (searchTerm) => {
    const results = Spotify.search(searchTerm);
    setSearchResults(results);
    /*Spotify.search(searchTerm)
      .then((results) => {
        return setSearchResults(results);
      })
      .catch((error) => {
        console.error(`Error searching ${error}`);
      });*/
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
