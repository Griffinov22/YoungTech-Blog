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
        // split the body information into array of strings by one or more line break or carriage return
        const paragraphs = res.data.body.split(/[(\n)|(\r)]+/);
        const formattedData = paragraphs.map((paragraph, ind) => {
          return (
            <p className="body-text" style={{ whiteSpace: "pre-line" }} key={ind}>
              {paragraph}
            </p>
          );
        });

        setPostData({ ...res.data, body: formattedData });
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  return (
    <div className="container">
      {error && <h2 className="text-center">There was an error getting the post data. Try again later.</h2>}

      {Object.keys(postData).length > 0 ? (
        <>
          {postData.pictureData && (
            <div className="post-image-container">
              <img src={postData.pictureData} className="post-image" />
            </div>
          )}
          <h1 className="text-center my-5">{postData.title}</h1>
          <div className="w-100">
            <p className="text-end fw-semibold text-muted mb-0 p-0">
              {postData.dateUpdated ? formatDate(postData.dateUpdated) : formatDate(postData.dateCreated)}
            </p>
            <p className="text-end fw-semibold text-muted mb-5">By: Griffin Overmyer</p>
          </div>
          <div className="mb-5 mx-auto body-text-parent">{postData.body}</div>
        </>
      ) : (
        <p className="text-center">loading...</p>
      )}
    </div>
  );
};

export default Post;
