import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const NavBar = () => {
  return (
    <nav className="bg-black m-0 p-0">
      <ul className="m-0 d-flex justify-content-between align-items-center list-unstyled py-3  wrapper text-white">
        <li>
          <Link to="/">
            <img src={logo} className="logo" alt="block chain logo" />
          </Link>
        </li>
        <AuthenticatedTemplate>
          <li>
            <Link to="posts/create" className="text-warning fw-bold auth-link">
              Make Post
            </Link>
          </li>
        </AuthenticatedTemplate>
        <li>
          <Link to="/about" className="nav-link">
            About Me
          </Link>
        </li>
        <li>
          <Link to="/" className="fs-3 fw-bold">
            Young Tech
          </Link>
        </li>
        <li>
          <Link to="/archive" className="nav-link">
            Post Archive
          </Link>
        </li>
        <AuthenticatedTemplate>
          <li>
            <Link to="/posts" className="text-warning fw-bold auth-link">
              All Posts
            </Link>
          </li>
        </AuthenticatedTemplate>
        <li>
          <Link to="/">
            <img src={logo} className="logo" alt="block chain logo" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
