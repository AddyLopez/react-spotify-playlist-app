import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track.js";

function Tracklist({ tracks, isDelete, onAdd, onDelete }) {
  return (
    <>
      {tracks.map((track) => {
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
