import React from 'react';

const SavedSearches = ({ savedSearches, onSelect }) => {
  return (
    <div>
      <h3>Saved Searches</h3>
      <ul>
        {savedSearches.map((city, index) => (
          <li key={index} onClick={() => onSelect(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSearches;
