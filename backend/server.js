require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

// Connect to database
connectDB();

const app = express();
// console.log("MONGO_URI:", process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// API route handler
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Job Posting API' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'https://job-posting-ashy-eight.vercel.app/'));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

