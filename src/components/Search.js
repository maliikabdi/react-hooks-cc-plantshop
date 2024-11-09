import React, { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState(""); // To track the search input

  // This function is triggered when the user types in the input field
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update the search query state
    onSearch(value); // Pass the query to the parent component to filter plants
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={query} // Bind the input field to the state (query)
        onChange={handleSearchChange} // Call the handler on change
      />
    </div>
  );
}

export default Search;
