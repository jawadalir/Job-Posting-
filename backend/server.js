require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (prefixed with /api for clarity)
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Simple API root
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Job Posting API' });
});

// Local development: start HTTP server only when not running on Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel serverless handler: export the Express app
module.exports = app;
