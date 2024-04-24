import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist({
  onDelete,
  onSave,
  onTitleChange,
  playlistTitle,
  playlist,
}) {
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <section className="Playlist">
      <input onChange={handleTitleChange} placeholder={playlistTitle} />
      <section>
        <Tracklist tracks={playlist} onDelete={onDelete} isDelete={true} />
      </section>
      <button className="save-playlist" onClick={onSave}>
        Save to Spotify
      </button>
    </section>
  );
}

export default Playlist;
