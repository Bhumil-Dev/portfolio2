'use strict';

require('dotenv').config();

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');

// ─── Route imports ────────────────────────────────────────────
const authRoutes      = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const projectRoutes   = require('./routes/projects');
const clientRoutes    = require('./routes/clients');
const categoryRoutes  = require('./routes/categories');
const statsRoutes     = require('./routes/stats');

// ─── App ──────────────────────────────────────────────────────
const app = express();

// ─── Security ─────────────────────────────────────────────────
app.use(helmet());

// ─── Rate limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs : 15 * 60 * 1000, // 15 minutes
  max      : 200,
  standardHeaders: true,
  legacyHeaders  : false,
  message  : { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api/', limiter);

// ─── CORS ─────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean); // remove undefined if FRONTEND_URL not set

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ─── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ─── Root route ───────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success : true,
    message : '🚀 Clip Crafters Portfolio Backend is Running',
    version : '1.0.0',
    env     : process.env.NODE_ENV || 'development',
  });
});

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success : true,
    status  : 'OK',
    message : 'Portfolio API is healthy',
    uptime  : `${Math.floor(process.uptime())}s`,
  });
});

// ─── API Routes ───────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/portfolio',  portfolioRoutes);
app.use('/api/projects',   projectRoutes);
app.use('/api/clients',    clientRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stats',      statsRoutes);

// ─── 404 handler (must be after all routes) ───────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global error handler ─────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('❌ Server error:', err.message);
  res.status(err.status || 500).json({
    success : false,
    message : err.message || 'Internal Server Error',
  });
});

// ─── Database connection & server start ───────────────────────
const PORT = process.env.PORT || 5000;

// Support both MONGO_URI and MONGODB_URI for flexibility
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/clipcrafters';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    await seedAdmin();
    app.listen(PORT, () => {
      console.log('─────────────────────────────────────');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Local:   http://localhost:${PORT}`);
      console.log(`📦 Env:     ${process.env.NODE_ENV || 'development'}`);
      console.log('─────────────────────────────────────');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ─── Admin seeding ────────────────────────────────────────────
async function seedAdmin() {
  const User   = require('./models/User');
  const bcrypt = require('bcryptjs');

  const adminEmail    = (process.env.ADMIN_EMAIL    || 'bhumilprajapati4@gmail.com').toLowerCase().trim();
  const adminPassword = (process.env.ADMIN_PASSWORD || '3004').toString();

  try {
    // Wipe old admin records so email/password changes always take effect
    await User.deleteMany({});

    const hashed = await bcrypt.hash(adminPassword, 12);
    await User.create({ email: adminEmail, password: hashed, role: 'admin' });

    console.log(`✅ Admin ready → ${adminEmail}`);
  } catch (err) {
    // Non-fatal — log and continue
    console.error('⚠️  Admin seed error:', err.message);
  }
}

module.exports = app;
