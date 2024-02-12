import { useContext } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className=" d-flex flex-column" style={{ minHeight: "100vh" }}>
      <NavBar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
