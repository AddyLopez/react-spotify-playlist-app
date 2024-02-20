import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist() {
  return (
    <section className="Playlist">
      <h2>New Playlist</h2>
      <section>
        <Tracklist />
      </section>
      <button className="save-playlist">Save to Spotify</button>
    </section>
  );
}

export default Playlist;
