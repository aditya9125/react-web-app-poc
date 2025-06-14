const mongoose = require('mongoose');

const appreciationSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
    trim: true
  },
  workName: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0              // Track how many people agree with this appreciation
  }
});

const Appreciation = mongoose.model('Appreciation', appreciationSchema);

module.exports = Appreciation; 