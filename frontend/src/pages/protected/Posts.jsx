import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  // const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { instance } = useMsal();

  useEffect(() => {
    if (!instance.getActiveAccount()) {
      navigate("/");
    }
  }, [instance]);

  return (
    <div className="container container_row-gap">
      <table className="m-auto table" style={{ minWidth: "50vw !important" }}>
        <thead className="table-dark">
          <tr>
            <th scope="col">One</th>
            <th scope="col">Two</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>body 1</td>
            <td>body 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
