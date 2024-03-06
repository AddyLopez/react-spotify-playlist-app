import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist({ onDelete, onTitleChange, playlistTitle, playlist }) {
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <section className="Playlist">
      <input onChange={handleTitleChange} defaultValue={playlistTitle} />
      <section>
        <Tracklist playlist={playlist} onDelete={onDelete} isDelete={true} />
      </section>
      <button className="save-playlist">Save to Spotify</button>
    </section>
  );
}

export default Playlist;
