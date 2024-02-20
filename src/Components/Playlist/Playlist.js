import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist() {
  return (
    <section className="Playlist">
      <p>Hello, from Playlist!</p>
      <section>
        <Tracklist />
      </section>
    </section>
  );
}

export default Playlist;
