import { MaterialSymbol } from "react-material-symbols"

const Navbar = () => {
    return (
        <header>
            <img id="logo" src="src/assets/logo.png" alt="ACM-DEI logo" />
            <MaterialSymbol icon="search" size={64} color="#ececec" className="menu-icon" title="Pesquisa" />
            <MaterialSymbol icon="check_box" size={64} color="#ececec" className="menu-icon" title="Legenda" />
            <MaterialSymbol icon="question_mark" size={64} color="#ececec" className="menu-icon" title="Como usar"  />
        </header>
    )
}

export default Navbar