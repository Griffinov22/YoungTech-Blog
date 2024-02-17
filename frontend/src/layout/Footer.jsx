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

  const { instance, accounts } = useMsal();
  const [username, setuserName] = useState("");
  const isAuthenticated = useIsAuthenticated();

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

  useEffect(() => {
    // if there is an account that has signed in, get the name because I assume it's shorter than the username. The username usually has a fallback to the user's email.
    if (accounts.length > 0) {
      const { name, username } = accounts[0];
      setuserName(name ?? username);
    }
  });

  return (
    <div className={"d-flex justify-content-between align-content-center py-2 px-4 bg-black"}>
      <img src={logo} alt="logo" className="logo" />
      <AuthenticatedTemplate>
        <div className="d-flex justify-content-between align-items-center column-gap-3">
          <p className="fst-italic text-white m-0 lh-1">{username}</p>
          <button className=" btn btn-outline-light opacity-50" onClick={signOut}>
            Manager Sign-out
          </button>
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <button className=" btn btn-outline-light opacity-50" onClick={signIn}>
          Manager Sign-in
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default Footer;
