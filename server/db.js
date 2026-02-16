const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'waste_db';

let client = null;
let db = null;

async function connect() {
  if (db) return db;
  if (!uri) throw new Error('MONGODB_URI manquant dans .env');
  const options = {
    tls: true,
    serverSelectionTimeoutMS: 10000,
  };
  client = new MongoClient(uri, options);
  await client.connect();
  db = client.db(dbName);
  return db;
}

function getDb() {
  if (!db) throw new Error('Base MongoDB non connectée. Appelez connect() au démarrage.');
  return db;
}

function docToId(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

module.exports = { connect, getDb, docToId };
