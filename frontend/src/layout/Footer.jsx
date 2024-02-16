import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";

const Footer = () => {
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [username, setuserName] = useState();

  const signIn = () => {
    instance.loginPopup().then((data) => {
      const { account } = data;
      const name = account.name ?? account.username;
      setuserName(name);
    });
  };

  const signOut = () => {
    instance.logout();
  };

  return (
    <div className={"d-flex justify-content-between align-content-center py-2 px-4 bg-black"}>
      <img src={logo} alt="logo" className="logo-img" />
      <button className="sigin-button">Manager Sign-in</button>
    </div>
  );
};

export default Footer;
