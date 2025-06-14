const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

// POST - Create new recommendation
router.post('/', async (req, res) => {
  try {
    const { contentName, platformName, specificReason } = req.body;
    
    if (!contentName || !platformName || !specificReason) {
      return res.status(400).json({ 
        error: 'Content name, platform name, and specific reason are required' 
      });
    }

    const newRecommendation = new Recommendation({
      contentName,
      platformName,
      specificReason
    });

    const savedRecommendation = await newRecommendation.save();
    
    res.status(201).json({
      message: 'Recommendation created successfully',
      data: savedRecommendation
    });

  } catch (error) {
    console.error('Error creating recommendation:', error);
    res.status(500).json({ 
      error: 'Failed to create recommendation',
      details: error.message 
    });
  }
});

// GET - Retrieve all recommendations
router.get('/', async (req, res) => {
  try {
    const recommendations = await Recommendation.find().sort({ createdAt: -1 });
    res.json({
      message: 'Recommendations retrieved successfully',
      data: recommendations,
      count: recommendations.length
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch recommendations' 
    });
  }
});

module.exports = router; 