import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return <div>create</div>;
};

export default Create;
