import { useState } from "react";
import FilterBox from "./components/FilterBox";
import Icicle from "./components/Icicle";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Slideshow from "./components/Slideshow";

function App() {
  const width = screen.width < 600 ? 480 : 928;
  const height =
    2 * window.innerHeight ||
    2 * document.documentElement.clientHeight ||
    2 * document.body.clientHeight;

  const [toggleState, setToggleState] = useState({
    search: false,
    filter: false,
    howTo: false,
  });

  const [checkedState, setCheckedState] = useState([
    "subarea1",
    "subarea2",
    "subarea3",
    "subarea4",
    "subarea5",
    "subarea6",
    "multiple",
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggle = (name) => {
    setToggleState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <>
      <Navbar handleToggle={handleToggle} />
      <SearchBox
        className={toggleState.search ? "visible" : "invisible"}
        onSearch={handleSearch}
      />
      <FilterBox
        onCheckedChange={setCheckedState}
        className={toggleState.filter ? "visible" : "invisible"}
      />
      <Icicle
        width={width}
        height={height}
        checkedState={checkedState}
        searchTerm={searchTerm}
      />
      <Slideshow display={toggleState.howTo} handleToggle={handleToggle} />
    </>
  );
}

export default App;
