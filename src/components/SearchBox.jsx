import { useRef, useState } from "react";
import PropTypes from "prop-types";

const SearchBox = ({ className, onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  const resetSearch = () => {
    setInputValue("");
    onSearch("");
    inputRef.current.value = "";
  };

  return (
    <div id="search-area" className={className}>
      <form id="search-line" onSubmit={handleSearchSubmit}>
        <input
          ref={inputRef}
          type="text"
          id="searchInput"
          placeholder="Search for a topic"
          onChange={handleInputChange}
        />
        <button id="searchButton" type="submit">
          Search
        </button>
      </form>
      <span id="search-reset" className="reset" onClick={resetSearch}>
        Reset
      </span>
    </div>
  );
};

SearchBox.propTypes = {
  className: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBox;
