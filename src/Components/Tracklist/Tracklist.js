import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track.js";

function Tracklist({ searchResults }) {
  return (
    <>
      <p>Hello, from Tracklist!</p>
      {searchResults.map((track) => {
        return <Track key={track.id} track={track} />;
      })}
    </>
  );
}

export default Tracklist;
