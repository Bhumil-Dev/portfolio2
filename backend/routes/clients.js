const express = require('express');
const router = express.Router();
const { Client, Stats } = require('../models/Client');
const { protect, adminOnly } = require('../middleware/auth');

// @GET /api/clients - Public
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find({ featured: true }).sort({ createdAt: -1 });
    const stats = await Stats.findOne() || { totalClients: 0, totalProjects: 0, experienceYears: 0 };
    res.json({ success: true, data: { clients, stats } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @POST /api/clients - Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @PUT /api/clients/:id - Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' });
    res.json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @DELETE /api/clients/:id - Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @PUT /api/clients/stats/update - Admin
router.put('/stats/update', protect, adminOnly, async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (stats) {
      stats = await Stats.findByIdAndUpdate(stats._id, req.body, { new: true });
    } else {
      stats = await Stats.create(req.body);
    }
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
