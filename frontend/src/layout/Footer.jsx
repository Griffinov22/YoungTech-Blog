import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className={"d-flex justify-content-between align-content-center py-2 px-4 bg-black"}>
      <img src={logo} alt="logo" className="logo" />
      <button className="sigin-button">Manager Sign-in</button>
    </div>
  );
};

export default Footer;
