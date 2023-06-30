import React from 'react';

const SearchResult = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {/* Display the search results here */}
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          {/* Display other relevant details */}
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
