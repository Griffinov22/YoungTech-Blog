const mongoose = require("mongoose");

// _id is auto set by db
const blogArticleSchema = new mongoose.Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  Date: {
    type: Date,
    default: new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  Image: { type: String, required: false },
});

module.exports = mongoose.model("Blog", blogArticleSchema);
