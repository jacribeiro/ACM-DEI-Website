import { useEffect, useState } from "react";
import FilterBox from "./components/FilterBox";
import Icicle from "./components/Icicle";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Slideshow from "./components/Slideshow";
import ProfessorBox from "./components/ProfessorBox";
import subareasProfessors from "../subareas_professors.json";

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

  const [subareaCheckedState, setSubareaCheckedState] = useState([
    "subarea1",
    "subarea2",
    "subarea3",
    "subarea4",
    "subarea5",
    "subarea6",
    "multiple",
  ]);

  const [professorCheckedState, setProfessorCheckedState] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const initialState = {};
    subareasProfessors.professors.forEach((professor) => {
      initialState[professor.name] = false;
    });
    setProfessorCheckedState(initialState);
  }, []);

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
        onCheckedChange={setSubareaCheckedState}
        className={toggleState.filter ? "visible" : "invisible"}
      />
      <ProfessorBox
        onCheckedChange={setProfessorCheckedState}
        className={toggleState.filter ? "visible" : "invisible"}
        professors={subareasProfessors.professors}
      />
      <Icicle
        width={width}
        height={height}
        subareaCheckedState={subareaCheckedState}
        professorCheckedState={professorCheckedState}
        searchTerm={searchTerm}
      />
      <Slideshow display={toggleState.howTo} handleToggle={handleToggle} />
    </>
  );
}

export default App;
