const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Construct MongoDB Atlas connection string
    // Make sure to allow 0.0.0.0/0 in MongoDB Atlas Network Access for anywhere connections
    const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected via Atlas');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error('Make sure:');
    console.error('1. Network Access is set to 0.0.0.0/0 in MongoDB Atlas');
    console.error('2. Database credentials are correct in .env file');
    console.error('3. Database name matches in .env file');
    process.exit(1);
  }
};

module.exports = connectDB;
