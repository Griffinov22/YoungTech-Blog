import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import defaultPicture from "../assets/purdue-arch.jpg";
import { AuthenticatedTemplate } from "@azure/msal-react";

const PostArchive = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
      .then((res) => {
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

  const handleDelete = (post) => {};

  return (
    <div className="container">
      <h1>Archive Posts</h1>
      {error ? (
        errorMessage
      ) : (
        <div className="archive-grid mb-5">
          {posts.map((obj, ind) => {
            return (
              <div key={ind}>
                <div className="card">
                  <img
                    className="card-img-top"
                    style={{ width: "200px", height: "225px", objectFit: "cover" }}
                    src={obj.pictureData ?? defaultPicture}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-4 card_overflow-3">{obj.title}</h5>
                    <div className=" d-flex w-100 justify-content-between flex-wrap">
                      <Link to={`/posts/${obj.Id}`} className="btn btn-primary fw-semibold">
                        See Full Post
                      </Link>
                      <AuthenticatedTemplate>
                        <div className="btn-group" role="group" aria-label="update or delete post">
                          <Link
                            to={`/posts/update/${obj.Id}`}
                            className="btn btn-warning fw-semibold text-white update-btn"
                          >
                            Update
                          </Link>
                          <button
                            data-toggle="modal"
                            data-target={"hello" + ind}
                            className="btn btn-danger fw-semibold text-white"
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
                  id={"hello" + ind}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby={`#postmodal${obj.Id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Modal title
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">...</div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
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
