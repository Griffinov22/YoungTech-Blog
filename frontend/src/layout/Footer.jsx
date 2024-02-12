import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";

const Footer = () => {
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
      <img src={logo} alt="logo" className="logo" />
      <div className="d-flex column-gap-2 align-items-center">
        <AuthenticatedTemplate>
          <p className="fst-italic text-white">{username}</p>
        </AuthenticatedTemplate>
        <AuthenticatedTemplate>
          <button className="btn btn-dark" onClick={signOut}>
            Manager Sign-out
          </button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button className="btn btn-dark" onClick={signIn}>
            Manager Sign-in
          </button>
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
};

export default Footer;
