import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";

dotenv.config({ path: './a.env' });

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI);
let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db('NflPlayers'); // ✅ still using this DB

    // ========== EXISTING ROUTES ==========

    // GET all NFL players
    app.get('/NflPlayers', async (req, res) => {
      try {
        const players = await db.collection('Info').find().toArray();
        res.json(players);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch players' });
      }
    });

    // SIGNUP route
    app.post('/signup', async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Normalize email
    email = email.trim().toLowerCase();

    const existingUser = await db.collection('UserData').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('UserData').insertOne({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created', userId: result.insertedId });
  } catch (err) {
    console.error('Signup failed:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

    // LOGIN route
 app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  try {
    const user = await db.collection('UserData').findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password.' });

    res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

    // ========== NEW RANKINGS ROUTES ==========

    // ✅ Save or update a user's rankings
    app.post('/saveRankings', async (req, res) => {
      const { username, rankings } = req.body;

      if (!username || !Array.isArray(rankings)) {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      try {
        await db.collection('Rankings').updateOne(
          { username },                     // find by username
          { $set: { rankings } },           // save rankings array (player ids or objects)
          { upsert: true }                  // create doc if doesn't exist
        );
        res.json({ success: true });
      } catch (err) {
        console.error('Error saving rankings:', err);
        res.status(500).json({ error: 'Failed to save rankings' });
      }
    });

    // ✅ Get a user's rankings
    app.get('/getRankings/:username', async (req, res) => {
      try {
        const doc = await db.collection('Rankings').findOne({ username: req.params.username });
        res.json(doc?.rankings || []); // return rankings array or []
      } catch (err) {
        console.error('Error fetching rankings:', err);
        res.status(500).json({ error: 'Failed to fetch rankings' });
      }
    });

    // ========== SERVER START ==========

    const PORT = process.env.PORT || 3001;
    const HOST = '0.0.0.0';

    app.listen(PORT, HOST, () =>
      console.log(`Server is running on http://${HOST}:${PORT}`)
    );

  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
