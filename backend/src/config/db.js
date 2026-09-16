const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/realcnc';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[RealCNC Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`[RealCNC Database] Warning: Could not connect to local MongoDB at ${uri}.`);
    console.warn(`[RealCNC Database] Error details: ${err.message}`);
    console.warn(`[RealCNC Database] Backend running in memory-resilient mode. Please ensure MongoDB service is active for persistent records.`);
    // Do not terminate process, allow server to continue running and retry
  }
};

module.exports = connectDB;
