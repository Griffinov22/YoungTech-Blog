import { useContext } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className=" d-flex flex-column" style={{ minHeight: "100vh" }}>
      <NavBar />
      <main className="flex-grow-1 wrapper py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
