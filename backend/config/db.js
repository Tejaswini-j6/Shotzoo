const mongoose = require('mongoose');

const seedUsers = [
  {
    fullName: 'Arut Selvi',
    email: 'aruts@shotzoo.com',
    password: 'shotzoo@2026',
    role: 'Admin',
    company: 'Shotzoo',
    designation: 'Growth Operations and Community Executive',
    phone: '7550105901',
    employeeType: 'Office'
  },
  {
    fullName: 'Santhosh',
    email: 'santhosh@shotzoo.com',
    password: 'santhosh@shotzoo',
    role: 'Employee',
    designation: 'Growth Strategy Manager',
    phone: '8428273301',
    employeeType: 'Office'
  },
  {
    fullName: 'Kishore',
    email: 'kishore@shotzoo.com',
    password: 'kishore@shotzoo',
    role: 'Employee',
    designation: 'Manager',
    phone: '8939055503',
    employeeType: 'Office'
  },
  {
    fullName: 'Nivetha',
    email: 'nivetha@shotzoo.com',
    password: 'Nivetha@shotzoo',
    role: 'Employee',
    designation: 'Performance Marketing',
    phone: '8248457414',
    employeeType: 'Office'
  },
  {
    fullName: 'Rameez',
    email: 'rameez@vfxpick.com',
    password: 'Rameez@shotzoo',
    role: 'Employee',
    designation: 'Production Executive in VFXPICK',
    phone: '7845947269',
    employeeType: 'Office'
  },
  {
    fullName: 'Arul and Tejaswini',
    email: 'interns@shotzoo.com',
    password: 'interns@shotzoo',
    role: 'Employee',
    designation: 'AI & Automation Intern',
    employeeType: 'Office'
  }
];

const seedAdmin = async () => {
  try {
    const User = require('../models/User');
    for (const u of seedUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log('Seeded user: ' + u.email);
      }
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
