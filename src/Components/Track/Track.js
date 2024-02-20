import React from "react";
import "./Track.css";

function Track() {
  return (
    <section className="Track">
      <h3>Track Name</h3>
      <p>
        <span>Artist</span>
        <span className="album">Album</span>
        <span>
          <button className="track-action">+/-</button>
        </span>
      </p>
    </section>
  );
}

export default Track;
