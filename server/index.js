const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const api = require("./api");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();

const whitelist = process.env.NODE_ENV == "production" ? [process.env.FRONTEND_URL] : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
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
app.use("/", api);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to mongoose"));

    app.listen(process.env.PORT || 3001, () => {
      console.log(`connected to server at http://localhost:${process.env.PORT || 3001}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

start();
