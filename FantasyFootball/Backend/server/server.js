import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

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
    db = client.db('NflPlayers');

    // GET route
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
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existingUser = await db.collection('UserData').findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: 'User with this email already exists' });
        }

        const result = await db.collection('UserData').insertOne({ name, email, password });
        res.status(201).json({ message: 'User created', userId: result.insertedId });
      } catch (err) {
        console.error('Signup failed:', err);
        res.status(500).json({ error: 'Signup failed' });
      }
    });

    // LOGIN route
  app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  email = email.trim().toLowerCase();

  try {
  const user = await db.collection('UserData').findOne({ email });

  console.log('Found user:', user);

  if (!user) {
    console.log('User not found');
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  if (user.password !== password) {
    console.log('Password mismatch');
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
} catch (err) {
  console.error('Login error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
});

    // Server start
    const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));

  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();