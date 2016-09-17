import React from 'react';
import Icon from './Icon';

function SearchBar(props) {
  return (
    <div className="searchBarContainer">
      <input
        type="text"
        className="proteinSearchBar"
        placeholder="Search"
      />
      <span className="proteinSearchBarText">
        <Icon
          iconType="search"
          style={{
            height: 15,
            width: 15,
            fill: '#A7ADB5',
          }}
        />
      </span>
    </div>
  );
}

export default SearchBar;