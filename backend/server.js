// 🎓 LEARNING: Main Express Server Setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 🎓 LEARNING: Import Route Files
const requestRoutes = require('./routes/requests');
const appreciationRoutes = require('./routes/appreciations');
const recommendationRoutes = require('./routes/recommendations');

// 🎓 LEARNING: Create Express Application
const app = express();
const PORT = process.env.PORT || 3001;

// 🎓 LEARNING: Middleware Setup
// CORS - Allow React app to make requests to this server
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Multiple React dev ports
  credentials: true
}));

// JSON Parser - Parse JSON request bodies
app.use(express.json());

// URL Encoded Parser - Parse form data
app.use(express.urlencoded({ extended: true }));

// 🎓 LEARNING: MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my-cinema', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// 🎓 LEARNING: API Routes Setup
// All request routes will be prefixed with /api/requests
app.use('/api/requests', requestRoutes);
app.use('/api/appreciations', appreciationRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 🎓 LEARNING: Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 🎓 LEARNING: Default Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MY CINEMA API',
    version: '1.0.0',
    endpoints: [
      'GET  /api/health',
      'POST /api/requests',
      'GET  /api/requests',
      'POST /api/appreciations',
      'GET  /api/appreciations',
      'POST /api/recommendations',
      'GET  /api/recommendations'
    ]
  });
});

// 🎓 LEARNING: 404 Error Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// 🎓 LEARNING: Global Error Handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// 🎓 LEARNING: Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
}); 