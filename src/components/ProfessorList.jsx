import PropTypes from "prop-types";

const ProfessorList = ({ items }) => {
  return (
    <ul>
      <li>Primary</li>
      <li>
        <ul>
          {items.primary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </li>
      <li>Secondary</li>
      <li>
        <ul>
          {items.secondary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

ProfessorList.propTypes = {
  items: PropTypes.object.isRequired,
};

export default ProfessorList;
