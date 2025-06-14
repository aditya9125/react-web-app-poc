const express = require('express');
const router = express.Router();
const Appreciation = require('../models/Appreciation');

// POST - Create new appreciation
router.post('/', async (req, res) => {
  try {
    const { artistName, workName } = req.body;
    
    if (!artistName || !workName) {
      return res.status(400).json({ 
        error: 'Artist name and work name are required' 
      });
    }

    const newAppreciation = new Appreciation({
      artistName,
      workName
    });

    const savedAppreciation = await newAppreciation.save();
    
    res.status(201).json({
      message: 'Appreciation created successfully',
      data: savedAppreciation
    });

  } catch (error) {
    console.error('Error creating appreciation:', error);
    res.status(500).json({ 
      error: 'Failed to create appreciation',
      details: error.message 
    });
  }
});

// GET - Retrieve all appreciations
router.get('/', async (req, res) => {
  try {
    const appreciations = await Appreciation.find().sort({ createdAt: -1 });
    res.json({
      message: 'Appreciations retrieved successfully',
      data: appreciations,
      count: appreciations.length
    });
  } catch (error) {
    console.error('Error fetching appreciations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch appreciations' 
    });
  }
});

module.exports = router; 