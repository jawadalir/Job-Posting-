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

// NOTE: No "/api" prefix here because Vercel will mount this under "/api"
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

// Simple health check / root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Job Posting API' });
});

module.exports = app;


