
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Needed unless you're using Node 18+
dotenv.config();

async function main() {

dotenv.config({ path: './a.env' }); // ✅ matching your example

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith("http://localhost:")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("NflPlayers");  // or your db name
    const playersCollection = db.collection("Info");

    // Optional: Clear old data if you want fresh import each time
    await playersCollection.deleteMany({});
    console.log("Cleared old player data.");

     const teamIds = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      33, // Ravens
      34  // Raiders
    ];
    let allPlayers = [];

    for (const teamId of teamIds) {
      try {
        const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/roster`);
        const data = await res.json();

        const teamName = data.team.displayName;

        const teamPlayers = data.athletes.flatMap(group =>
  group.items
    .filter(player => {
      const pos = player.position?.abbreviation || "";
      return ["QB", "RB", "WR", "TE", "PK"].includes(pos);
    })
    .map(player => ({
      id: player.id,
      fullName: player.fullName,
      position: player.position?.abbreviation || null,
      team: teamName,
      headshot: player.headshot?.href || null,
    }))
    
);

        allPlayers.push(...teamPlayers);
      } catch (err) {
        console.warn(`Failed to fetch team ${teamId}:`, err);
      }
    }

    if (allPlayers.length) {
      const insertResult = await playersCollection.insertMany(allPlayers);
      console.log(`Inserted ${insertResult.insertedCount} players.`);
    } else {
      console.log("No players found to insert.");
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await client.close();
  }
}

main();
