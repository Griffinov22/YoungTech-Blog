const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const blogArticle = require("./models/blogArticleSchema");

router.get("/", (_, res) => res.sendStatus(200));

router.get("/posts", async (req, res) => {
  try {
    const articles = await blogArticle.find({}).sort({ Date: -1 });
    res.send(articles);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Servers are down. Try again later." });
  }
});

router.get("/posts/recent", async ({ query }, res) => {
  if (!Object.hasOwn(query, "amount") || isNaN(query.amount))
    return res.status(405).send({ error: "must have 'amount' parameter of type number" });

  try {
    const articles = await blogArticle.find({}).sort({ Date: -1 }).limit(query.amount);
    res.send(articles);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Servers are down. Try again later." });
  }
});

router.get("/posts/:id", async ({ params }, res) => {
  if (!params.id) res.status(405).json({ error: "must have 'id' parameter" });

  try {
    const article = await blogArticle.findById(params.id);
    res.send(article);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Servers are down. Try again later." });
  }
});

router.delete("/posts/delete/:id", async ({ params }, res) => {
  if (!params.id) res.status(405).json({ error: "must have 'id' parameter" });

  try {
    const article = await blogArticle.findByIdAndDelete(params.id);
    res.send(article);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Servers are down. Try again later." });
  }
});
//create a post
router.post("/posts", async ({ body, files }, res) => {
  if (!body.title || !body.body)
    return res.status(405).send({ error: "'title' and 'body' are required to make blog articles" });

  if (files != null) {
    if (Object.keys(files).length !== 1) {
      res.send({ message: "Only one image is allowed to be submitted", error: true });
    } else if (!files.image.mimetype.startsWith("image/")) {
      res.status(500).send({ message: "File must be of type image", error: true });
    }
  }

  const newBlog = new blogArticle({
    Title: body.title,
    Description: body.body,
    Image: files?.image?.data ? `data:${files.image.mimetype};base64,${files.image.data.toString("base64")}` : null,
  });

  await newBlog
    .save()
    .then(() => {
      res.send({ message: "successfully created post", error: false });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({ error: "Servers are down. Try again later." });
    });
});

//Update post
router.put("/posts/update/:id?", async ({ body, params, files }, res) => {
  // to remove an image from a blog post send {delPhoto: true}
  if (!params.id) return res.status(405).json({ error: "must have 'id' parameter" });

  try {
    // optionally add the paramaters to the update object and return the new document instance
    const article = await blogArticle.findByIdAndUpdate(
      params.id,
      {
        ...(body?.Title && { Title: body.Title }),
        ...(body?.Description && { Description: body.Description }),
        ...((files?.image?.data || body.delPhoto) && {
          Image: body.delPhoto ? null : `data:${files.image.mimetype};base64,${files.image.data.toString("base64")}`,
        }),
      },
      {
        new: true,
      }
    );
    res.send(article);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Servers are down. Try again later." });
  }
});

module.exports = router;
