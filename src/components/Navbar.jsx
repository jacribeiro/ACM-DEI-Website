import PropTypes from "prop-types";
import { MaterialSymbol } from "react-material-symbols";

const Navbar = ({ handleToggle }) => {
  return (
    <header>
      <img id="logo" src="src/assets/logo.png" alt="ACM-DEI logo" />
      <MaterialSymbol
        icon="search"
        size={64}
        color="#ececec"
        className="menu-icon"
        title="Pesquisa"
        onClick={() => handleToggle("search")}
      />
      <MaterialSymbol
        icon="check_box"
        size={64}
        color="#ececec"
        className="menu-icon"
        title="Legenda"
        onClick={() => handleToggle("filter")}
      />
      <MaterialSymbol
        icon="question_mark"
        size={64}
        color="#ececec"
        className="menu-icon"
        title="Como usar"
        onClick={() => handleToggle("howTo")}
      />
    </header>
  );
};

Navbar.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};

export default Navbar;
