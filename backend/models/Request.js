// 🎓 LEARNING: MongoDB Model with Mongoose
const mongoose = require('mongoose');

// 🎓 LEARNING: Schema Definition
// Schema defines the structure of documents in MongoDB
const requestSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,          // This field is mandatory
    trim: true              // Removes whitespace from beginning and end
  },
  roleType: {
    type: String,
    required: true,
    enum: ['Comedy Role', 'Criminal Role', 'Lead Role'] // Only these values allowed
  },
  // 🎓 LEARNING: Automatic Timestamps
  createdAt: {
    type: Date,
    default: Date.now       // Automatically set when document is created
  },
  status: {
    type: String,
    default: 'pending',     // Default status for new requests
    enum: ['pending', 'approved', 'rejected']
  }
});

// 🎓 LEARNING: Create Model from Schema
// Model is a class that constructs documents
const Request = mongoose.model('Request', requestSchema);

module.exports = Request; 