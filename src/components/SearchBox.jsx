import PropTypes from "prop-types";

const SearchBox = ({ style }) => {
  return (
    <div id="search-area" style={style} >
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
  style: PropTypes.object,
}

export default SearchBox;
