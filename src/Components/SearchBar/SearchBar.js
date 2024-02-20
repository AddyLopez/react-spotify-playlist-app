import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  return (
    <>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      <input
        type="text"
        placeholder="Search for a song, album, or artist"
        aria-label="search button"
      />
    </>
  );
}

export default SearchBar;
