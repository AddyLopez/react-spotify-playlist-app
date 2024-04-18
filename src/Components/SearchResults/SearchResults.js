import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults({ searchResults, onAdd }) {
  return (
    <section className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd} isDelete={false} />
    </section>
  );
}

export default SearchResults;
