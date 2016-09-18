import React from 'react';
import Icon from './Icon';


class SearchBar extends React.Component {
  shouldComponentUpdate(np) {
    return this.props.value !== np.value;
  }

  render() {
    const { value, onChange, onSearch } = this.props;
    return (
    <div className="searchBarContainer">
      <input
        type="text"
        className="proteinSearchBar"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onSearch();
          }
        }}
      />
      <span className="proteinSearchBarText">
        <Icon
          iconType="search"
          style={{
            height: 15,
            width: 15,
            fill: '#A7ADB5',
          }}
          onClick={onSearch}
        />
      </span>
    </div>
  );
  }
}

export default SearchBar;