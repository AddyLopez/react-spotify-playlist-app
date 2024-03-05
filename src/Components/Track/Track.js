import React from "react";
import "./Track.css";

function Track(props) {
  const renderButton = () => {
    if (props.isDelete) {
      return <button className="track-action">-</button>;
    } else {
      return <button className="track-action">+</button>;
    }
  };

  return (
    <section className="Track">
      <h3>Track Name</h3>
      <p>
        <span>Artist</span>
        <span className="album">Album</span>
        <span>{renderButton()}</span>
      </p>
    </section>
  );
}

export default Track;
