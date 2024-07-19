import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import subareasProfessors from "../../subareas_professors.json";

const ProfessorBox = ({ className }) => {
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    const initialState = {};
    subareasProfessors.professors.forEach((professor) => {
      initialState[professor.name] = false;
    });
    setCheckedState(initialState);
  }, []);

  const handleInputChange = (event) => {
    const { id, checked } = event.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <div id="professor-box" className={`filter ${className}`}>
      <h2>Professores</h2>
      <ul>
        {subareasProfessors.professors.map((professor) => (
          <li className="checkbox-item" key={professor.name}>
            <label htmlFor={professor.name}>{professor.name}</label>
            <input
              type="checkbox"
              id={professor.id}
              checked={checkedState[professor.id]}
              onChange={handleInputChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfessorBox.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ProfessorBox;
