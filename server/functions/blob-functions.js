const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config({ path: __dirname + "../../.env" });

const connStr = String(process.env.BLOB_CONNECTION);

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

async function main() {
  let i = 1;
  let containers = blobServiceClient.listContainers();
  for await (const container of containers) {
    console.log(`Container ${i++}: ${container.name}`);
  }
}

main();
