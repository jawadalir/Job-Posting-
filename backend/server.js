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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Base API route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Job Posting API' });
});

// Catch-all route for undefined API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server only if not running on serverless platform
if (process.env.NODE_ENV !== 'vercel') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for serverless deployment (Vercel / Netlify)
module.exports = app;
