import purdueArch from "../assets/purdue-arch.jpg";
import { postData } from "../data/postData";
import movingLogo from "../assets/static-logo.png";
import trustedIcon from "../assets/trusted-icon.svg";
import peopleOutline from "../assets/people-outline.svg";
import headshot from "../assets/headshot.jpeg";

const Landing = () => {
  const postCards = postData.map((obj, ind) => {
    return (
      <div key={ind} className="card rounded-0 border-0">
        <img className="card-img-top" src="https://placehold.co/200x100" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{obj.title}</h5>
          <p className="card-text card_overflow-2">{obj.description}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  });

  return (
    <div className="container container_row-gap">
      <div className="row justify-content-center">
        <img src={purdueArch} alt="Purdue Background" className=" rounded-3 main_img" />
      </div>

      <div className="row justify-content-between">
        {/* main */}
        <div className="col-sm-12 col-md-8 d-flex flex-column">
          <div>
            <h1 className=" fw-bolder">Welcome to Young Tech</h1>
            <p className="subsection-title m-0">
              A Blog, Guide, and Commentary about Purdue and the ever growing technology around us
            </p>
          </div>

          {/* group everything that isn't the intro text into a evenly justified flex box */}
          <div className="d-flex flex-column justify-content-evenly flex-grow-1">
            <div className="row d-flex rounded-4 border border-3 border-dark-subtle">
              <div className="col-ms-12 col-md-6 p-3 d-grid" style={{ placeItems: "center" }}>
                <div>
                  <h2>Hey I'm Griffin 👋</h2>
                  <p>
                    I'm a junior at Purdue University Studying Web Development and Design. I find
                    building websites very fascinating, but I also really love sports! In my free
                    time I enjoy drinking coffee, swimming, and skiing.
                  </p>
                </div>
              </div>
              <div className="col-ms-12 col-md-6 p-3">
                <img
                  src={headshot}
                  className="rounded-2"
                  alt="headshot of Griffin Overmyer in 2022"
                />
              </div>
            </div>

            <div className="row call-grid justify-content-around my-5">
              <div className="col-4 d-flex flex-column align-items-center row-gap-4">
                <img src={movingLogo} alt="internet gif" />
                <p className="text-center">
                  Real information about technology from a real human being
                </p>
              </div>
              <div className="col-4 d-flex flex-column align-items-center row-gap-4">
                <img src={trustedIcon} alt="trusted source icon" />
                <p className="text-center">
                  Commentary from a trusted source. I am not getting paid by any business for my
                  content.
                </p>
              </div>
              <div className="col-4 d-flex flex-column align-items-center row-gap-4">
                <img src={peopleOutline} alt="outline of three people" />
                <p className="text-center">No outside influence persuade my opinion on topics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* sidebar */}
        <aside className="row col-sm-12 col-md-3 m-0 p-0 border border-2 border-dark-subtle rounded-2">
          <h3 className=" text-center fw-bold border-bottom border-2 border-dark-subtle">
            Recent posts
          </h3>
          {postCards}
        </aside>
      </div>
    </div>
  );
};

export default Landing;
