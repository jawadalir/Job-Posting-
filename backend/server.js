import express from 'express';
import { createServer } from 'vercel-express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';

// Connect DB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Job Posting API' });
});

// Serve React build
app.use(express.static(path.join(process.cwd(), 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/build/index.html'));
});

// **Remove app.listen()**
export default createServer(app);
