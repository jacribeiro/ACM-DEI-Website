import PropTypes from "prop-types";

const SearchBox = ({ className }) => {
  return (
    <div id="search-area" className={className}>
      <div id="search-line">
        <input type="text" id="searchInput" placeholder="Search for a topic" />
        <button id="searchButton">Search</button>
      </div>
      <span id="search-reset" className="reset">
        Reset
      </span>
    </div>
  );
};

SearchBox.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SearchBox;
