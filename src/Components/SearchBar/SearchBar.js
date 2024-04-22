import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /* const search = useCallback(() => {
    onSearch(searchTerm);
  }, [onSearch, searchTerm]);*/

  const search = () => {
    onSearch(searchTerm);
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
