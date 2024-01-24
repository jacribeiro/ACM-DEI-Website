import { useState } from "react";
import FilterBox from "./components/FilterBox";
import Icicle from "./components/Icicle";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";

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
    "multiple"
  ]);

  const handleToggle = (name) => {
    setToggleState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <>
      <Navbar handleToggle={handleToggle} />
      <SearchBox style={{ opacity: toggleState.search ? 1 : 0 }} />
      <FilterBox
        onCheckedChange={setCheckedState}
        style={{ opacity: toggleState.filter ? 1 : 0 }}
      />
      <Icicle width={width} height={height} checkedState={checkedState} />
    </>
  );
}

export default App;
