import { useState } from "react";
import FilterBox from "./components/FilterBox";
import Icicle from "./components/Icicle";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";

function App() {
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
      <Icicle />
    </>
  );
}

export default App;
