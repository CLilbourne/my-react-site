import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './a.env' });

const client = new MongoClient(process.env.ATLAS_URI);
const SALT_ROUNDS = 10;

async function migratePasswords() {
  try {
    await client.connect();
    const db = client.db('NflPlayers');
    const users = await db.collection('UserData').find().toArray();

    for (const user of users) {
      // bcrypt hashes always start with $2
      if (!user.password.startsWith('$2')) {
        console.log(`Migrating user: ${user.email}`);
        const hashed = await bcrypt.hash(user.password, SALT_ROUNDS);
        await db.collection('UserData').updateOne(
          { _id: user._id },
          { $set: { password: hashed } }
        );
      }
    }

    console.log('Migration complete ✅');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migratePasswords();