// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error('❌ CRITICAL: MONGO_URI is not defined in environment variables!');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error(err); // full stack/message for diagnostics
    process.exit(1);
  });

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const scheduleRoutes = require('./src/routes/scheduleRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/bookings', bookingRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Cinema Booking API is running!',
    status: 'success',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin',
      movies: '/api/movies',
      schedules: '/api/schedules',
      bookings: '/api/bookings',
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  });
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════');
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`🔒 Auth:    http://localhost:${PORT}/api/auth`);
  console.log(`👑 Admin:   http://localhost:${PORT}/api/admin`);
  console.log('═══════════════════════════════════════════════');
});

module.exports = app;