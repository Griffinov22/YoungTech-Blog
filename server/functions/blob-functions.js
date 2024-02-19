const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config({ path: __dirname + "../../.env" });
const fs = require("fs");

const connStr = String(process.env.BLOB_CONNECTION);

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

async function main() {
  const containerClient = blobServiceClient.getContainerClient("pic-storage-container");

  let base64_image;
  fs.readFile(__dirname + "/../" + "assets/" + "static-logo.png", async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const blockBlobClient = containerClient.getBlockBlobClient("static-logo.png");
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

    console.log("blob created successfully");
  });
}

main();
