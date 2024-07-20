import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProfessorBox = ({ className, professors }) => {
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    const initialState = {};
    professors.forEach((professor) => {
      initialState[professor.name] = false;
    });
    setCheckedState(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {professors.map((professor) => (
          <li className="checkbox-item" key={professor.name}>
            <label htmlFor={professor.name}>{professor.name}</label>
            <input
              type="checkbox"
              id={professor.name}
              checked={checkedState[professor.name]}
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
  professors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ProfessorBox;
