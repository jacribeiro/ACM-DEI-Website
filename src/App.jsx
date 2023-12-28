import FilterBox from "./components/FilterBox";
import Icicle from "./components/Icicle";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";

function App() {
  const handleCheckedState = (checkedState) => {
    console.log(checkedState);
  };

  return (
    <>
      <Navbar />
      <SearchBox />
      <FilterBox onCheckedChange={handleCheckedState} />
      <Icicle />
    </>
  );
}

export default App;
