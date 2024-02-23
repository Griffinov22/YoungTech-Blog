import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Posts = () => {
  // const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!instance.getActiveAccount()) {
      navigate("/");
    }

    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts`).then((result) => {
      if (result.status == 200) {
        setBlogPosts(result.data);
        setError(false);
      } else {
        setError(true);
      }
    });
  }, [instance]);

  // format date
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="container container_row-gap">
      {error && <h2 className="text-center">There was an error getting posts</h2>}
      {blogPosts.length > 0 ? (
        <table className="m-auto table" style={{ minWidth: "50vw !important" }}>
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
              <th scope="col">Date</th>
              <th scope="col">PictureName</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post, ind) => {
              // prefer to show the updated date or default to the date the post was initially created
              let postDate = post.dateUpdated ?? post.dateCreated;

              return (
                <tr key={ind}>
                  <td>{post.Id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>{formatDate(postDate)}</td>
                  <td>{post.pictureName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center fw-semibold" style={{ maxWidth: "none" }}>
          Loading...
        </p>
      )}
    </div>
  );
};

export default Posts;
