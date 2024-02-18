import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Posts = () => {
  // const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!instance.getActiveAccount()) {
      navigate("/");
    }

    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts`).then((result) => {
      if (result.status == 200) {
        setPosts(result.data);
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
      {posts.length > 0 && (
        <table className="m-auto table" style={{ minWidth: "50vw !important" }}>
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, ind) => {
              // prefer to show the updated date or default to the date the post was initially created
              let postDate = post.dateUpdated ?? post.dateCreated;

              return (
                <tr key={ind}>
                  <td>{post.Id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>{formatDate(postDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Posts;