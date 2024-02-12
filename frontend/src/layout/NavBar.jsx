import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-black m-0 p-0">
      <ul className="m-0 d-flex justify-content-between align-items-center list-unstyled py-3  wrapper text-white">
        <li>
          <Link to="#">
            <img src={logo} className="logo" alt="block chain logo" />
          </Link>
        </li>
        <li>
          <Link to="#">About Me</Link>
        </li>
        <li>
          <Link to="#" className="fs-3 fw-bold">
            Young Tech
          </Link>
        </li>
        <li>
          <Link to="#">My Life</Link>
        </li>
        <li>
          <Link to="#">
            <img src={logo} className="logo" alt="block chain logo" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
