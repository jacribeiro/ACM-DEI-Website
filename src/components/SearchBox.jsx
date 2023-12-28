const SearchBox = () => {
  return (
    <div id="search-area">
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

export default SearchBox;
