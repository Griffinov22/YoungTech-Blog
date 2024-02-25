import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const Update = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState({ title: "", body: "", Id: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!instance.getActiveAccount() || !id) {
      navigate("/");
    } else {
      Axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            setPostData(res.data);
          } else {
            console.log("error occured getting data");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [instance, id]);

  const handleSubmitPost = (e) => {
    e.preventDefault();

    // gather data
    const { title, body, id } = postData;
    const imageInput = e.target.imageInput.files;
    let hasImage = false;

    // check if there is an image
    if (imageInput.length === 1) {
      hasImage = true;
    } else if (imageInput.length > 1) {
      throw Error("too many images were provided");
    }

    if (title && body && id) {
      Axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/update/${id}`,
        {
          title,
          body,
          id,
          ...(hasImage && { image: imageInput[0] }),
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      ).then((result) => {
        // backend is configured to return true is successful

        if (!result.data.error) {
          setPostData({ title: "", body: "", id: "" });
          showSuccess();
        }
      });
    }
  };

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    //   wait one second before redirect
    setTimeout(() => {
      return <Navigate to="/archive" />;
    }, 1000);
  };

  return (
    <div className="container container_row-gap position-relative">
      <h1 className=" fw-bolder">Update Post</h1>
      <div
        className={
          "alert alert-success position-absolute text-nowrap start-0 end-0 mx-auto " +
          (success ? "" : "fade")
        }
        style={{ width: "min-content" }}
        role="alert"
      >
        Post was updated Successfully
      </div>

      <form className=" form-check" onSubmit={handleSubmitPost}>
        <div className="mb-3">
          <label htmlFor="Id" className="fw-semibold fs-5 d-block form-label">
            ID
          </label>

          <input
            disabled
            type="text"
            name="Id"
            id="Id"
            className="form-control fw-medium"
            value={postData.Id}
          />
          <input
            type="hidden"
            name="Id"
            id="Id"
            className="form-control fw-medium"
            value={postData.Id}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="fw-semibold fs-5 d-block form-label">
            Title <span className=" text-danger">*</span>
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
          <div className="d-flex align-items-center column-gap-4">
            <label htmlFor="imageInput" className="fw-semibold fs-5 d-block form-label">
              Overwrite an image
            </label>
            {postData.pictureData && postData.pictureName && (
              <>
                (
                <span className=" fs-6 fw-bold fst-italic text-primary">
                  {postData.pictureName}
                </span>
                <img
                  src={postData.pictureData}
                  alt="image for article"
                  className="update-thumbnail"
                />
                )
              </>
            )}
          </div>
          <input type="file" name="imageInput" id="imageInput" className="form-control fw-medium" />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="fw-semibold fs-5 d-block form-label">
            Content <span className=" text-danger">*</span>
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

export default Update;
