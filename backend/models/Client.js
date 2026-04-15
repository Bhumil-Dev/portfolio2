const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    default: ''
  },
  testimonial: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const statsSchema = new mongoose.Schema({
  totalClients: { type: Number, default: 0 },
  totalProjects: { type: Number, default: 0 },
  experienceYears: { type: Number, default: 0 },
  happyClients: { type: Number, default: 0 }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
const Stats = mongoose.model('Stats', statsSchema);

module.exports = { Client, Stats };
