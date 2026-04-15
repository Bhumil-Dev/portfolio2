const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const categoryRoutes = require('./routes/categories');
const statsRoutes = require('./routes/stats');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(async () => {
    console.log('✅ MongoDB connected');
    // Seed admin user
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function seedAdmin() {
  const User = require('./models/User');
  const bcrypt = require('bcryptjs');
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'bhumilprajapati4@gmail.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || '3004';
    const hashed = await bcrypt.hash(String(adminPassword), 12);

    // Delete any old admin users (handles email change)
    await User.deleteMany({});

    // Create fresh admin
    await User.create({
      email: adminEmail,
      password: hashed,
      role: 'admin'
    });
    console.log(`✅ Admin user ready: ${adminEmail}`);
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

module.exports = app;
