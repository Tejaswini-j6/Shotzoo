const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try local MongoDB first
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB Connected: ' + mongoose.connection.host);
  } catch (err) {
    // Fallback to in-memory MongoDB (lazy-load so it's not required if local Mongo works)
    console.log('Local MongoDB not found. Starting in-memory database...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('In-Memory MongoDB Connected: ' + uri);
    } catch (memErr) {
      console.error('Failed to start in-memory DB. Install mongodb-memory-server or start local MongoDB.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;
