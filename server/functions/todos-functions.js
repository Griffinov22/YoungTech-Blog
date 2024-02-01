const sql = require("mssql");
const config = require("../config/sql-config");
const fs = require("fs");

//testing
// getAllPosts();
// getSinglePostById(8);
// deleteSinglePostById(5);
// createPost("Fake title Here", "Maybe fake body here too.");
// updatePost(6, "title", "NEW body");

async function getAllPosts() {
  try {
    const poolConnection = await sql.connect(config);
    const { recordset } = await poolConnection.request().query(`SELECT * FROM Blogs`);

    // [{...},{...}]
    console.log(recordset);
    return recordset;
  } catch (err) {
    return { message: "error retrieving documents" };
  }
}

async function getSinglePostById(id) {
  try {
    const poolConnection = await sql.connect(config);

    const { recordset } = await poolConnection
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Blogs WHERE id = @id`);

    return recordset;
  } catch (err) {
    return { message: "error retrieving document" };
  }
}

async function deleteSinglePostById(id) {
  try {
    const poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM Blogs WHERE id = @id`);

    //rowsAffected will have an array of one integer that
    //represents the amount of rows modified if the query is successful
    return recordset.rowsAffected[0] > 0;
  } catch (err) {
    return { message: "error retrieving document" };
  }
}

async function createPost(title, body) {
  //title and body are required and must be of type string

  if (typeof title !== "string" && typeof body !== "string")
    return { message: "title or body not of type string" };
  if (title == undefined || body == undefined) return { message: "title or body is missing" };

  try {
    const poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input("title", sql.VarChar(255), title)
      .input("body", sql.VarChar(255), body)
      .query(`INSERT INTO Blogs (title, body) VALUES (@title, @body)`);

    //rowsAffected will have an array of one integer that
    //represents the amount of rows modified if the query is successful
    return res.rowsAffected[0] > 0;
  } catch (err) {
    return { message: "error inserting document" };
  }
}

async function updatePost(id, title, body) {
  //title and body are required and must be of type string
  if (typeof title !== "string" || typeof body !== "string" || typeof id !== "number")
    return { message: "title, body, id is not of type string" };
  if (title == undefined || body == undefined) return { message: "title or body is missing" };

  try {
    const poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input("title", sql.VarChar(255), title)
      .input("body", sql.VarChar(255), body)
      .input("id", sql.Int, id)
      .query(`UPDATE Blogs SET title = @title, body = @body WHERE id = @id`);

    //rowsAffected will have an array of one integer that
    //represents the amount of rows modified if the query is successful
    return res.rowsAffected[0] > 0;
  } catch (err) {
    return { message: "error inserting document" };
  }
}

module.exports = { getAllPosts, getSinglePostById, deleteSinglePostById, createPost, updatePost };

//proof of concepts -----------------------------------------------------------
async function insertImage() {
  let base64_image;
  fs.readFile(__dirname + "/../" + "assets/" + "static-logo.png", "binary", async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    //success
    base64_image = Buffer.from(data);

    const poolConnection = await sql.connect(config);
    const res = await poolConnection
      .request()
      .input("base64_image", sql.VarBinary, base64_image)
      .query(`INSERT INTO BlogImages (PostId, ImageData) VALUES (1, @base64_image)`);

    console.log("successfully inserted image");
  });
}

async function readImage() {
  const poolConnection = await sql.connect(config);
  const { recordset } = await poolConnection
    .request()
    .query(`SELECT ImageData FROM BlogImages WHERE PostId = 1`);

  const buffer = Buffer.from(recordset[0].ImageData, "base64");
  fs.writeFile(__dirname + "/../assets/newImage.png", buffer, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("successfully created image");
  });
}
