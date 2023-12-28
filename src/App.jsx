import FilterBox from "./components/FilterBox";
import Icicle from "./components/Icicle";
import Navbar from "./components/Navbar";

function App() {
  const handleCheckedState = (checkedState) => {
    console.log(checkedState);
  };

  return (
    <>
      <Navbar />
      <FilterBox onCheckedChange={handleCheckedState} />
      <Icicle />
    </>
  );
}

export default App;
