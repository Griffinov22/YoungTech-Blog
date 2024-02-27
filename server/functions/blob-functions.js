const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config({ path: __dirname + "../../.env" });

const connStr = String(process.env.BLOB_CONNECTION);
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerClient = blobServiceClient.getContainerClient("pic-storage-container");

async function addPicToBlobContainer(imageFile, fileName) {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const uploadBlobResponse = await blockBlobClient.uploadData(imageFile.data);
}

//only overwrite the files contents. We are keeping the same file name since it is a GUID.
async function updateBlobToContainer(oldFileName, newImageFile) {
  //if this container containerClient cannot find a file with oldFileName, it will create a blob with that name
  const blockBlobClient = containerClient.getBlockBlobClient(oldFileName);
  const imageFile = await blockBlobClient.exists();
  if (imageFile) {
    try {
      const downloadRespone = await blockBlobClient.download();
      const downloaded = await streamToBuffer(downloadRespone.readableStreamBody);
      //check if images are the same
      console.log("new file length: ", newImageFile.size, "\n old file length: ", downloaded.size);
      if (newImageFile.size != downloaded.size) {
        console.log("different file...changing file");
        //image is different so updload new file
        const uploadBlobResponse = await blockBlobClient.uploadData(newImageFile.data);
        console.log("changed file\n\n", uploadBlobResponse);
        return uploadBlobResponse;
      } else {
        console.log("image files were same size. No overiding done.");
        return true;
      }
    } catch (err) {
      return err;
    }
  } else {
    //image file name doesn't exist.
    console.log("image file didn't exist. Writing to blob name provided");
    const uploadBlobResponse = await blockBlobClient.uploadData(newImageFile.data);
    return uploadBlobResponse;
  }
}

async function deleteBlobToContainer(fileName) {
  console.log(fileName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const imageFile = await blockBlobClient.exists();
  if (imageFile) {
    const delRespones = await blockBlobClient.delete({ deleteSnapshots: "include" });
    console.log(delRespones);
    return delRespones;
  }
}

async function readBlobFromContainer(fileName) {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const imageFile = await blockBlobClient.exists();
  if (imageFile) {
    try {
      const downloadRespone = await blockBlobClient.download();
      const downloaded = await streamToBuffer(downloadRespone.readableStreamBody);
      return downloaded;
    } catch (err) {
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

module.exports = {
  addPicToBlobContainer,
  readBlobFromContainer,
  deleteBlobToContainer,
  updateBlobToContainer,
};
