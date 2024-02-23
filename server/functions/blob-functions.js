const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config({ path: __dirname + "../../.env" });

const connStr = String(process.env.BLOB_CONNECTION);
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerClient = blobServiceClient.getContainerClient("pic-storage-container");

async function addPicToBlobContainer(imageFile, fileName) {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const uploadBlobResponse = await blockBlobClient.uploadData(imageFile.data);
  console.log(uploadBlobResponse);
}

async function readBlobFromContainer(fileName) {
  const blockBlobClient = containerClient.getBlockBlobClient(
    "c21c4171-9624-49ea-8b1b-c7c348c68621.jpg"
  );
  const imageFile = await blockBlobClient.exists();
  if (imageFile) {
    try {
      const downloadRespone = await blockBlobClient.download();
      const downloaded = await streamToBuffer(downloadRespone.readableStreamBody);
      return downloaded;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

//used to read blob
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

readBlobFromContainer();

module.exports = { addPicToBlobContainer };
