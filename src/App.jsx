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
    howTo: false
  });

  const handleToggle = (name) => {
    setToggleState((prevState) => ({
      ...prevState,
      [name]: !prevState[name], 
    }));
    console.log(toggleState);
  };

  const handleCheckedState = (checkedState) => {
    console.log(checkedState);
  };

  return (
    <>
      <Navbar handleToggle={handleToggle} />
      <SearchBox style={{ opacity: toggleState.search ? 1 : 0 }} />
      <FilterBox onCheckedChange={handleCheckedState} style={{ opacity: toggleState.filter ? 1 : 0 }} />
      <Icicle width={width} height={height} />
    </>
  );
}

export default App;
