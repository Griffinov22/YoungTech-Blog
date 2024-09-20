const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });
const {
  getPosts,
  getSinglePostById,
  deleteSinglePostById,
  createPostWithoutImage,
  createPostWithImage,
  updatePost,
} = require("./functions/todos-functions");
const app = express();

const cron_apis = process.env.CRON_JOB_IPS.split(" ");

const whitelist =
  process.env.NODE_ENV == "production" ? [process.env.FRONTEND_URL, ...cron_apis] : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // !origin is calling from curl
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(origin + " is not whitelisted"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => res.sendStatus(200));

app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.send(posts);
});

app.post("/posts/recent", async ({ body }, res) => {
  const posts = await getPosts(body.amount);
  res.send(posts);
});

app.get("/posts/:id", async ({ params }, res) => {
  const post = await getSinglePostById(Number(params.id));
  res.send(post);
});

app.delete("/posts/delete/:id", async ({ params }, res) => {
  const isSuccessful = await deleteSinglePostById(params.id);
  res.send(isSuccessful);
});
//create a post
app.post("/posts", async ({ body, files }, res) => {
  if (files != null) {
    console.log("post with image");
    // check if file is of type image and only one file

    //errors are caught in function

    if (Object.keys(files).length !== 1) {
      res.send({ message: "Only one image is allowed to be submitted", error: true });
    } else if (!files.image.mimetype.startsWith("image/")) {
      res.send({ message: "File must be of type image", error: true });
    }
    // successfull image received
    await createPostWithImage(body.title, body.body, files.image);
  } else {
    // there is no image
    await createPostWithoutImage(body.title, body.body);
  }

  res.send({ message: "successfully created post", error: false });
});

//Update post
app.post("/posts/update/:id?", async ({ body, params, files }, res) => {
  //acces file image without getting error when trying to access a property on undefined object
  //delPhoto is a bool that lets the backend know to delete a photo from post
  const fileImage = files ? files.image : undefined;
  const isSuccessful = await updatePost(
    Number(params.id),
    body.title,
    body.body,
    fileImage,
    body.pictureName,
    Boolean(body.delPhoto)
  );

  res.send(isSuccessful);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`connected to server at http://localhost:${process.env.PORT || 3001}`);
});
