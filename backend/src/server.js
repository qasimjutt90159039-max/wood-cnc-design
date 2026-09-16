const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { seedInitialData } = require('./seeds/seedData');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or dev origins
    if (!origin) return callback(null, true);
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Wood CNC Design Shop - RealCNC API',
    category: 'Interior Decorator',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found on RealCNC server`
  });
});

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize Server & Database
const startServer = async () => {
  try {
    await connectDB();
    await seedInitialData();

    app.listen(PORT, () => {
      console.log(`[RealCNC API Server] Listening on http://localhost:${PORT}`);
      console.log(`[RealCNC API Server] System mode: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('[RealCNC Fatal Error]', err);
    process.exit(1);
  }
};

startServer();
