
const { MongoClient } = require('mongodb');

let database;
let client;

const initDb = async () => {
  if (database) {
    return database;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  client = new MongoClient(uri);

  await client.connect();

  database = client.db('dragonTaskDB');

  // Verify the database connection
  await database.command({ ping: 1 });

  console.log('Connected to Dragon Task database');

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};
