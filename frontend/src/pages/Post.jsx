import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { formatDate } from "../helpers/helperFunctions";

const Post = () => {
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(false);
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/error" />;
  }

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
      .then((res) => {
        setPostData(res.data);
        console.log(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  return (
    <div className="container">
      {error && (
        <h2 className="text-center">There was an error getting the post data. Try again later.</h2>
      )}

      {Object.keys(postData).length > 0 ? (
        <>
          {postData.pictureData && (
            <div className="post-image-container">
              <img src={postData.pictureData} className="post-image" />
            </div>
          )}
          <h1 className="text-center">{postData.title}</h1>
          <div className="w-100">
            <p className="text-end fw-semibold text-muted mb-0 p-0">
              {postData.dateUpdated
                ? formatDate(postData.dateUpdated)
                : formatDate(postData.dateCreated)}
            </p>
            <p className="text-end fw-semibold text-muted mb-5">By: Griffin Overmyer</p>
          </div>
          <div>
            <p className="body-text">{postData.body}</p>
          </div>
        </>
      ) : (
        <p className="text-center">loading...</p>
      )}
    </div>
  );
};

export default Post;
