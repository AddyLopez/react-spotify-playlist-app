import React from "react";
import "./Track.css";

function Track({ isDelete, onAdd, onDelete, track }) {
  const addTrack = () => {
    onAdd(track);
  };

  const deleteTrack = () => {
    onDelete(track);
  };

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
