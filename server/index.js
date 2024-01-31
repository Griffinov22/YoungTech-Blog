const express = require("express");
const cors = require("cors");
const app = express();

//db
const { Request } = require("./config/sql-config");

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  res.send("working...");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`connected to server at http://localhost:${process.env.PORT || 3001}`);
});
