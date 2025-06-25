const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./a.env" });

async function main() {
  console.log("Mongo URI:", process.env.ATLAS_URI);
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    const collections = await client.db("NflPlayers").collections();
    collections.forEach((collection) =>
      console.log(collection.s.namespace.collection)
    );
  } catch (e) {
    console.error("Error occurred:", e);
  } finally {
    await client.close();
  }
}

main();