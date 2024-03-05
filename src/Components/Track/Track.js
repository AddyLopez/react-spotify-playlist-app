import React from "react";
import "./Track.css";

function Track({ isDelete, track }) {
  const renderButton = () => {
    if (props.isDelete) {
      return <button className="track-action">-</button>;
    } else {
      return <button className="track-action">+</button>;
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
