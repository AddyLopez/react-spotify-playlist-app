import React, { useCallback } from "react";
import "./Track.css";

function Track({ isDelete, onAdd, onDelete, track }) {
  const addTrack = useCallback(
    (event) => {
      onAdd(track);
    },
    [onAdd, track]
  );

  const deleteTrack = useCallback(
    (event) => {
      onDelete(track);
    },
    [onDelete, track]
  );

  const renderButton = () => {
    if (isDelete) {
      return (
        <button className="track-action" onClick={deleteTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  };

  return (
    <section className="Track">
      <h3>{track.name}</h3>
      <p>
        <span>{track.artist}</span>
        <span className="album">{track.album}</span>
        <span>{renderButton()}</span>
      </p>
    </section>
  );
}

export default Track;
