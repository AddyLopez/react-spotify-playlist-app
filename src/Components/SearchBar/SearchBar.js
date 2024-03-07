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
    search();
  };
  return (
    <>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      <input
        type="text"
        onChange={handleSearchTermChange}
        placeholder="Search for a song, album, or artist"
        aria-label="search button"
      />
    </>
  );
}

export default SearchBar;
