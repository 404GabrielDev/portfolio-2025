import "./navbar.css";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav>
      <p>João Gabriel</p>

      <div className="nav-btns">
        <Link to="summary" smooth={true} duration={800}>
          <button>Sobre mim</button>
        </Link>

        <Link to="formularioContact" smooth={true} duration={1000}>
          <button>Contato</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
