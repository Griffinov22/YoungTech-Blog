const sql = require("mssql");
const config = require("../config/sql-config");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const {
  addPicToBlobContainer,
  readBlobFromContainer,
  updateBlobToContainer,
} = require("./blob-functions");

//testing
// getAllPosts();
// getSinglePostById(8);
// deleteSinglePostById(5);
// createPost("Fake title Here", "Maybe fake body here too.");
// updatePost(6, "title", "NEW body");

async function getPosts(amount) {
  try {
    const poolConnection = await sql.connect(config);
    let query;

    if (amount != undefined) {
      query = await poolConnection
        .request()
        .input("amount", sql.Int, Number(amount))
        .query(`SELECT TOP (@amount) * FROM Blogs ORDER BY dateCreated DESC`);
    } else {
      query = await poolConnection.request().query(`SELECT * FROM Blogs`);
    }

    const recordset = query.recordset;

    const recordsWithImages = await Promise.all(
      recordset.map(async (obj) => {
        if (obj.pictureName != null) {
          const imageBuffer = await readBlobFromContainer(obj.pictureName);
          const extension = obj.pictureName.split(".")[1];
          const base64 = imageBuffer.toString("base64");
          return {
            ...obj,
            pictureData: `data:image/${extension};base64,${base64}`,
          };
        }
        // if getting the image causes an error, just return the post without the image.
        return obj;
      })
    );
    // [{...},{...}]
    return recordsWithImages;
  } catch (err) {
    return { message: "error retrieving documents", error: err };
  }
}

async function getSinglePostById(id) {
  try {
    const poolConnection = await sql.connect(config);

    const { recordset } = await poolConnection
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Blogs WHERE id = @id`);

    // add image data if available
    if (recordset[0].pictureName != null) {
      const imageBuffer = await readBlobFromContainer(recordset[0].pictureName);
      const extension = recordset[0].pictureName.split(".")[1];
      const base64 = imageBuffer.toString("base64");
      return {
        ...recordset[0],
        pictureData: `data:image/${extension};base64,${base64}`,
      };
    }

    //return post data if no image is attached to the post
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

async function createPostWithoutImage(title, body) {
  //title and body are required and must be of type string

  if (typeof title !== "string" && typeof body !== "string")
    return { message: "title or body not of type string" };
  if (title == undefined || body == undefined) return { message: "title or body is missing" };

  try {
    const poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input("title", sql.VarChar(255), title)
      .input("body", sql.VarChar(sql.MAX), body)
      .query(`INSERT INTO Blogs (title, body) VALUES (@title, @body)`);

    //rowsAffected will have an array of one integer that
    //represents the amount of rows modified if the query is successful
    return res.rowsAffected[0] > 0;
  } catch (err) {
    return { message: "error inserting document" };
  }
}

async function createPostWithImage(title, body, imageFile) {
  //title and body are required and must be of type string

  if (typeof title !== "string" && typeof body !== "string")
    return { message: "title or body not of type string" };
  if (title == undefined || body == undefined) return { message: "title or body is missing" };

  try {
    const poolConnection = await sql.connect(config);

    // GUID + . (extention name)
    const imageName = uuidv4() + "." + imageFile.name.split(".")[1];

    // add image to blob container with same name as one stored in sql db
    await addPicToBlobContainer(imageFile, imageName);

    const res = await poolConnection
      .request()
      .input("title", sql.VarChar(255), title)
      .input("body", sql.VarChar(sql.MAX), body)
      .input("pictureName", sql.VarChar(100), imageName)
      .query(`INSERT INTO Blogs (title, body, pictureName) VALUES (@title, @body, @pictureName)`);

    //rowsAffected will have an array of one integer that
    //represents the amount of rows modified if the query is successful
    return res.rowsAffected[0] > 0;
  } catch (err) {
    return { message: "error inserting document" };
  }
}

async function updatePost(id, title, body, imageFile) {
  //title and body are required and must be of type string
  if (typeof title !== "string" || typeof body !== "string" || typeof id !== "number")
    return { message: "title, body, id is not of type string" };
  if (title == undefined || body == undefined) return { message: "title or body is missing" };

  try {
    const poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input("title", sql.VarChar(255), title)
      .input("body", sql.VarChar(sql.MAX), body)
      .query(`UPDATE Blogs SET title = @title, body = @body WHERE id = @id`);

    if (imageFile) {
      console.log("initiating updating file...");
      const updatedImageResponse = await updateBlobToContainer(res.pictureName, imageFile);
      console.log("updated image successfully: ", updatedImageResponse);
    }

    //rowsAffected will have an array of one integer that
    //represents the amount of rows modified if the query is successful
    return res.rowsAffected[0] > 0;
  } catch (err) {
    return { message: "error inserting document" };
  }
}

module.exports = {
  getPosts,
  getSinglePostById,
  deleteSinglePostById,
  createPostWithoutImage,
  updatePost,
  createPostWithImage,
};

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
