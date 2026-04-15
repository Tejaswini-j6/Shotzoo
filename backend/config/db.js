const mongoose = require('mongoose');

const seedAdmin = async () => {
  try {
    const User = require('../models/User');
    const adminExists = await User.findOne({ email: 'admin@shotzoo.com' });
    if (!adminExists) {
      await User.create({
        fullName: 'Admin',
        email: 'admin@shotzoo.com',
        password: 'shotzoo@2026',
        confirmPassword: 'shotzoo@2026',
        role: 'Admin',
        employeeType: 'Office'
      });
      console.log('Admin account seeded: admin@shotzoo.com');
    }
    const empExists = await User.findOne({ email: 'testemp@shotzoo.com' });
    if (!empExists) {
      await User.create({
        fullName: 'Test1',
        email: 'testemp@shotzoo.com',
        password: 'emp1@2026',
        confirmPassword: 'emp1@2026',
        role: 'employee',
        designation: 'AI and automation',
        employeeType: 'Office'
      });
      console.log('Employee account seeded: testemp@shotzoo.com');
    }
  } catch (e) {
    console.error('Seed error:', e.message);
  }
};

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
  await seedAdmin();
};

module.exports = connectDB;
