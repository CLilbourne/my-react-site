import { MongoClient } from 'mongodb';

async function testConnection() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Connection failed", err);
  } finally {
    await client.close();
  }
}

testConnection();
