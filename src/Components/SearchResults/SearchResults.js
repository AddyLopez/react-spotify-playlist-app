import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults({ searchResults }) {
  return (
    <section className="SearchResults">
      <h2>Results</h2>
      <Tracklist searchResults={searchResults} />
    </section>
  );
}

export default SearchResults;
