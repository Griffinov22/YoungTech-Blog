const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const {
  getAllPosts,
  getSinglePostById,
  deleteSinglePostById,
  createPost,
  updatePost,
} = require("./functions/todos-functions");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const posts = await getAllPosts();
  res.send(posts);
});

app.get("/posts/:id", async ({ params }, res) => {
  const post = await getSinglePostById(params.id);
  res.send(post);
});

app.get("/posts/delete/:id", async ({ params }, res) => {
  const isSuccessful = await deleteSinglePostById(params.id);
  res.send(isSuccessful);
  console.log("hello");
});
//create a post
app.post("/posts", async ({ body }, res) => {
  //todo: handle image input to server through http request
  const image = body.image;
  const isSuccessful = await createPost(body.title, body.body);
  res.send(isSuccessful);
});
//Update post
app.post("/posts/update/:id?", async ({ body, params }, res) => {
  const isSuccessful = await updatePost(params.id, body.title, body.body);
  res.send(isSuccessful);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`connected to server at http://localhost:${process.env.PORT || 3001}`);
});
