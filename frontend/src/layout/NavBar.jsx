import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useState } from "react";

const NavBar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const closeMobileMenu = () => {
    setIsChecked(false);
    console.log("ran");
  };

  return (
    <nav className="bg-black m-0 p-0 z-1">
      <ul className="wide-nav-list m-0 d-flex justify-content-between align-items-center list-unstyled py-3  wrapper text-white">
        <li className="top-logo-li">
          <Link to="/">
            <img src={logo} className="logo top-logo" alt="block chain logo" />
          </Link>
        </li>
        <AuthenticatedTemplate>
          <li className="make-posts-li">
            <Link to="/posts/create" className="text-warning fw-bold auth-link">
              Make Post
            </Link>
          </li>
        </AuthenticatedTemplate>
        <li className="about-li">
          <Link to="/about" className="nav-link">
            About Me
          </Link>
        </li>
        <li className="brand-li">
          <Link to="/" className="fs-3 fw-bold">
            Young Tech
          </Link>
        </li>
        <li className="archive-li">
          <Link to="/archive" className="nav-link">
            Post Archive
          </Link>
        </li>
        <AuthenticatedTemplate>
          <li className="all-posts-li">
            <Link to="/posts" className="text-warning fw-bold auth-link">
              All Posts
            </Link>
          </li>
        </AuthenticatedTemplate>
        <li className="bottom-logo-li">
          <Link to="/">
            <img src={logo} className="logo bottom-logo" alt="block chain logo" />
          </Link>
        </li>
      </ul>
      {/* mobile nav */}
      <div className="small-nav py-3 wrapper text-white d-flex justify-content-between align-items-center">
        <Link to="/" className="fs-3 fw-bold" onClick={closeMobileMenu}>
          Young Tech
        </Link>
        <div id="hamb">
          <span></span>
          <span></span>
          <span></span>
          <input type="checkbox" id="menu-toggle" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        </div>
        <ul id="small-nav-list" className="position-absolute py-2 start-0 top-0 end-0 list-unstyled text-center">
          <AuthenticatedTemplate>
            <li className="make-posts-li">
              <Link to="/posts/create" className="text-warning fw-bold auth-link" onClick={closeMobileMenu}>
                Make Post
              </Link>
            </li>
          </AuthenticatedTemplate>
          <AuthenticatedTemplate>
            <li className="all-posts-li">
              <Link to="/posts" className="text-warning fw-bold auth-link" onClick={closeMobileMenu}>
                All Posts
              </Link>
            </li>
          </AuthenticatedTemplate>
          <li className="brand-li">
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="about-li">
            <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
              About Me
            </Link>
          </li>
          <li className="archive-li">
            <Link to="/archive" className="nav-link" onClick={closeMobileMenu}>
              Post Archive
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
