import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Spotify from "../../util/Spotify.js";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  /* const search = useCallback(() => {
    onSearch(searchTerm);
  }, [onSearch, searchTerm]);*/

  const search = (event) => {
    event.preventDefault();
    Spotify.troubleShoot(searchTerm);
  };

  return (
    <div className="SearchBar">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      <input
        type="text"
        onChange={handleSearchTermChange}
        placeholder="Search for a song, album, or artist"
        aria-label="search button"
      />
      <button onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
