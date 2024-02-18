import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Create = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ title: "", body: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!instance.getActiveAccount()) {
      navigate("/");
    }
  }, [instance]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const { title, body } = postData;
    if (title && body) {
      Axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, {
        title,
        body,
      }).then((result) => {
        // backend is configured to return true is successful
        if (result.data == true) {
          showSuccess();
        }
      });

      setPostData({ title: "", body: "" });
    }
  };

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  console.log(success);

  return (
    <div className="container container_row-gap position-relative">
      <h1 className=" fw-bolder">Create Post</h1>
      <div
        className={
          "alert alert-success position-absolute text-nowrap start-0 end-0 mx-auto " +
          (success ? "" : "fade")
        }
        style={{ width: "min-content" }}
        role="alert"
      >
        Post was created Successfully
      </div>

      <form className=" form-check" onSubmit={handleSubmitPost}>
        <div className="mb-3">
          <label htmlFor="title" className="fw-semibold fs-5 d-block form-label">
            Title
          </label>
          <input
            required
            type="text"
            name="title"
            id="title"
            className="form-control fw-medium"
            value={postData.title}
            onChange={(e) => setPostData((prev) => ({ body: prev.body, title: e.target.value }))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="fw-semibold fs-5 d-block form-label">
            Content
          </label>
          <textarea
            required
            rows={10}
            name="body"
            id="body"
            className="form-control fw-medium"
            value={postData.body}
            onChange={(e) => setPostData((prev) => ({ body: e.target.value, title: prev.title }))}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value="submit"
            className={"btn " + (postData.title && postData.body ? "btn-success" : "btn-dark")}
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
