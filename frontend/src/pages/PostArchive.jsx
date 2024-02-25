import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import defaultPicture from "../assets/purdue-arch.jpg";
import { AuthenticatedTemplate } from "@azure/msal-react";

const PostArchive = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const errorMessage = (
    <div className="w-100">
      <p className="text-center text-danger fw-bold">
        There was an error getting the posts. Try again later
      </p>
    </div>
  );

  return (
    <div className="container">
      <h1>Archive Posts</h1>
      {error ? (
        errorMessage
      ) : (
        <div className="archive-grid mb-5">
          {posts.map((obj, ind) => {
            return (
              <div key={ind} className="card">
                <img
                  className="card-img-top"
                  style={{ width: "200px", height: "225px", objectFit: "cover" }}
                  src={obj.pictureData ?? defaultPicture}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title mb-4 card_overflow-3">{obj.title}</h5>
                  <div className=" d-flex w-100 justify-content-between">
                    <Link to={`/posts/${obj.Id}`} className="btn btn-primary fw-semibold">
                      See Full Post
                    </Link>
                    <AuthenticatedTemplate>
                      <Link
                        to={`/posts/update/${obj.Id}`}
                        className="btn btn-warning fw-semibold text-white update-btn"
                      >
                        Update
                      </Link>
                    </AuthenticatedTemplate>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostArchive;
