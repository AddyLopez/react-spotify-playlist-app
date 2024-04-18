import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const search = () => {
    onSearch(searchTerm);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="SearchBar">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      <form onSubmit={search}>
        <input
          type="text"
          name="query"
          onChange={handleSearchTermChange}
          placeholder="Search for a song, album, or artist"
          aria-label="search button"
        />
      </form>
    </div>
  );
}

export default SearchBar;
