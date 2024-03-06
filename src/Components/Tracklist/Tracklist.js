import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track.js";

function Tracklist({ isDelete, onAdd, onDelete, searchResults }) {
  return (
    <>
      <p>Hello, from Tracklist!</p>
      {searchResults.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            onAdd={onAdd}
            onDelete={onDelete}
            isDelete={isDelete}
          />
        );
      })}
    </>
  );
}

export default Tracklist;
