import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import defaultPicture from "../assets/purdue-arch.jpg";
import { AuthenticatedTemplate } from "@azure/msal-react";
import LoadingIcon from "../components/LoadingIcon";

const PostArchive = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
      .then((res) => {
        if (!res.data.error) {
          setPosts(res.data);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [successDelete]);

  const errorMessage = (
    <div className="alert alert-danger" role="alert">
      There was an error getting the posts. Try again later.
    </div>
  );

  const successMessage = (
    <div className="alert alert-success" role="alert">
      Post was successfully deleted.
    </div>
  );

  const handleDelete = (id) => {
    Axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/delete/${id}`)
      .then((res) => {
        if (!res.data.error) {
          showAlert(setSuccessDelete);
          setError(false);
        } else {
          showAlert(setError);
          setSuccessDelete(false);
        }
        window.scrollTo(0, 0);
      })
      .catch(() => {
        showAlert(setError);
        setSuccessDelete(false);
      });
  };

  const showAlert = (stateSetter) => {
    // this function shows the success delete alert or error alert
    stateSetter(true);
    setTimeout(() => {
      stateSetter(false);
    }, 1500);
  };

  return (
    <div className="container">
      <h1>Archive Posts</h1>
      {error && errorMessage}
      {successDelete && successMessage}

      {posts.length > 0 ? (
        <div className="archive-grid mb-5">
          {posts.map((obj, ind) => {
            return (
              <div key={ind}>
                <div className="card">
                  <img
                    className="card-img-top"
                    style={{ height: "225px", objectFit: "cover" }}
                    src={obj.Image ?? defaultPicture}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-4 card_overflow-3">{obj.Title}</h5>
                    <div className=" d-flex w-100 justify-content-between flex-wrap">
                      <Link to={`/posts/${obj._id}`} className="btn btn-primary fw-semibold">
                        See Full Post
                      </Link>
                      <AuthenticatedTemplate>
                        <div className="btn-group" role="group" aria-label="update or delete post">
                          <Link
                            to={`/posts/update/${obj._id}`}
                            className="btn btn-warning fw-semibold text-white update-btn"
                          >
                            Update
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger fw-semibold"
                            data-bs-toggle="modal"
                            data-bs-target={`#post-${obj._id}`}
                          >
                            Delete
                          </button>
                        </div>
                      </AuthenticatedTemplate>
                    </div>
                  </div>
                </div>

                {/* attached modal for deletion */}
                <div
                  className="modal fade"
                  id={`post-${obj._id}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5 text-danger">Are you sure you want to delete this post?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Post title: <span className=" fw-semibold">{obj.Title}</span>
                        </p>
                        {obj.pictureData && <img className="" src={obj.pictureData} />}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                          onClick={() => handleDelete(obj._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="w-100"
          style={{
            display: "grid",
            placeItems: "center",
            alignItems: "end",
            height: "200px",
          }}
        >
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

export default PostArchive;
