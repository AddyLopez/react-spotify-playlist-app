import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist({ onDelete, playlistTitle, playlist }) {
  return (
    <section className="Playlist">
      <h2>{playlistTitle}</h2>
      <section>
        <Tracklist playlist={playlist} onDelete={onDelete} isDelete={true} />
      </section>
      <button className="save-playlist">Save to Spotify</button>
    </section>
  );
}

export default Playlist;
