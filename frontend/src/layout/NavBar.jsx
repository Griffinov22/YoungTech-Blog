import logo from "../assets/logo.svg";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#">
            <img src={logo} className="logo-img" alt="block chain logo" />
          </a>
        </li>
        <li>
          <a href="#">My Schedule</a>
        </li>
        <li>
          <a href="#">About Me</a>
        </li>
        <li>
          <a href="#">My Life</a>
        </li>
        <li>
          <a href="#">
            <img src={logo} className="logo-img" alt="block chain logo" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
