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
                            type="button"
                            class="btn btn-danger fw-semibold"
                            data-bs-toggle="modal"
                            data-bs-target={`#post-${obj.Id}`}
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
                  class="modal fade"
                  id={`post-${obj.Id}`}
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">...</div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
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
