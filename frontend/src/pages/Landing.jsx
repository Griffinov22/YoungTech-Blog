import purdueArch from "../assets/purdue-arch.jpg";
import movingLogo from "../assets/static-logo.png";
import trustedIcon from "../assets/trusted-icon.svg";
import peopleOutline from "../assets/people-outline.svg";
import headshot from "../assets/headshot.jpeg";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";

const Landing = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts/recent?amount=${import.meta.env.VITE_RECENT_AMOUNT}`)
      .then((res) => {
        if (!res.data.error) {
          setRecentPosts(res.data);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const postCards = recentPosts?.map((obj, ind) => {
    return (
      <div key={ind} className="card p-0">
        <img
          className="card-img-top"
          style={{ height: "130px", objectFit: "cover" }}
          src={obj.Image ?? purdueArch}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title card_overflow-2">{obj.Title}</h5>
          <Link to={`/posts/${obj._id}`} className="btn btn-primary">
            See Full Post
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="container container_row-gap">
      <div className="row">
        <img
          src={purdueArch}
          style={{ height: "100%", maxHeight: "400px", objectFit: "cover" }}
          alt="Purdue Background"
          className="rounded-3 col-12 mx-auto"
        />
      </div>

      <div className="row justify-content-between">
        {/* main */}
        <div className="col-sm-12 col-md-8 d-flex flex-column">
          <div className="mb-4">
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
                    I'm a <i>senior</i> at Purdue University Studying Web Development and Design. I find building
                    websites very fascinating, but I also really love sports! In my free time I enjoy drinking coffee,
                    swimming, and skiing.
                  </p>
                </div>
              </div>
              <div className="col-ms-12 col-md-6 p-3">
                <img src={headshot} className="rounded-2" alt="headshot of Griffin Overmyer in 2022" />
              </div>
            </div>

            <div className="row call-grid justify-content-around my-5">
              <div className="col-4 d-flex flex-column align-items-center row-gap-4">
                <img src={movingLogo} alt="internet gif" />
                <p className="text-center">Real information about technology from a real human being</p>
              </div>
              <div className="col-4 d-flex flex-column align-items-center row-gap-4">
                <img src={trustedIcon} alt="trusted source icon" />
                <p className="text-center">
                  Commentary from a trusted source. I am not getting paid by any business for my content.
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
        <aside className="row col-sm-12 col-md-3 m-0 p-2 align-content-start border border-2 border-dark-subtle rounded-2 ">
          <h3 className=" text-center m-0 mb-3 flex-grow-0 fw-bold border-bottom border-2 border-dark-subtle lh-1 align-self-start py-2">
            Recent posts
          </h3>
          <div className="m-0 p-0 d-flex flex-column flex-grow-1 row-gap-5 justify-content-end">
            {error && <div className="alert alert-danger">Error Loading recent post data</div>}
            {postCards.length > 0 ? (
              postCards
            ) : (
              <div className=" mx-auto mt-5">
                <LoadingIcon />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Landing;
