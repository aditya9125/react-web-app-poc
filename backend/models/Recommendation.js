const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  contentName: {
    type: String,
    required: true,
    trim: true
  },
  platformName: {
    type: String,
    required: true,
    trim: true
  },
  specificReason: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500          // Limit recommendation text length
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5              // Default high rating for recommendations
  },
  category: {
    type: String,
    enum: ['Movie', 'TV Show', 'Documentary', 'Series', 'Other'],
    default: 'Other'
  }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation; 