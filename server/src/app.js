// server/src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTripData } from './controllers/tripController.js';

dotenv.config();

const app = express();

// Enable CORS for all origins temporarily
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'NYC Taxi API is running' });
});

// Trip routes - make sure path matches exactly
app.get('/api/trips', getTripData);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;