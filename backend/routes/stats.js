const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const { Client, Stats } = require('../models/Client');
const Category = require('../models/Category');
const { protect, adminOnly } = require('../middleware/auth');

// @GET /api/stats/dashboard - Admin only
router.get('/dashboard', protect, adminOnly, async (req, res) => {
  try {
    const [portfolioCount, projectCount, clientCount, categoryCount, stats] = await Promise.all([
      Portfolio.countDocuments(),
      Project.countDocuments(),
      Client.countDocuments(),
      Category.countDocuments(),
      Stats.findOne()
    ]);

    // Portfolio by category
    const portfolioByCategory = await Portfolio.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          portfolio: portfolioCount,
          projects: projectCount,
          clients: clientCount,
          categories: categoryCount
        },
        portfolioByCategory,
        stats
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
