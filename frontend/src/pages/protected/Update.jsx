import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";

const Update = () => {
  const { instance } = useMsal();
  // param variable name: id
  // statte variable name: Id
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    Id: "",
    pictureName: "",
    delPhoto: false,
  });
  const [success, setSuccess] = useState(false);
  const [readyToNavigate, setReadyToNavigate] = useState(false);

  useEffect(() => {
    if (!instance.getActiveAccount() || !id) {
      setReadyToNavigate(true);
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

  const handleUpdatePost = (e) => {
    e.preventDefault();

    // gather data
    const { title, body, Id, delPhoto, pictureName } = postData;
    const imageInput = e.target.imageInput.files;
    let hasImage = false;

    // check if there is an image
    if (imageInput.length === 1) {
      hasImage = true;
    } else if (imageInput.length > 1) {
      throw Error("too many images were provided");
    }

    if (title && body && Id) {
      Axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/update/${Id}`,
        {
          title,
          body,
          Id,
          delPhoto,
          pictureName,
          ...(hasImage && { image: imageInput[0] }),
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      ).then((result) => {
        // backend is configured to return true is successful
        console.log(result.data);

        if (!result.data.error) {
          setPostData({ title: "", body: "", Id: "" });
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
      setReadyToNavigate(true);
    }, 1000);
  };

  // if successful post or unsuccessful not given an id
  if (readyToNavigate) {
    return <Navigate to="/archive" />;
  }

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

      {postData.Id != "" && (
        <form className=" form-check" onSubmit={handleUpdatePost}>
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
              onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center column-gap-4">
              <label htmlFor="imageInput" className="fw-semibold fs-5 d-block form-label">
                Overwrite an image
              </label>
              {postData.pictureData && postData.pictureName && (
                <>
                  <span className=" fs-6 fw-bold fst-italic text-primary">
                    {postData.pictureName}
                  </span>

                  <img
                    src={postData.pictureData}
                    alt="image for article"
                    className="update-thumbnail"
                  />

                  <div className="ms-auto d-flex align-items-center column-gap-2">
                    <label
                      htmlFor="del-photo"
                      className="fw-semibold fs-6 p-0 m-0 text-danger d-block form-label lh-1"
                    >
                      Delete Image
                    </label>
                    <input
                      type="checkbox"
                      name="del-photo"
                      id="del-photo"
                      className="lh-1 m-0 p-0"
                      onChange={(e) =>
                        setPostData((prev) => ({ ...prev, delPhoto: e.target.checked }))
                      }
                      value={setPostData.delPhoto}
                    />
                  </div>
                </>
              )}
            </div>
            <input
              type="file"
              name="imageInput"
              id="imageInput"
              className="form-control fw-medium"
            />
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
              onChange={(e) => setPostData((prev) => ({ ...prev, body: e.target.value }))}
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
      )}
    </div>
  );
};

export default Update;
