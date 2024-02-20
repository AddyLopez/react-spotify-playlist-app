import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults() {
  return (
    <section className="SearchResults">
      <h2>Results</h2>
      <Tracklist />
    </section>
  );
}

export default SearchResults;
