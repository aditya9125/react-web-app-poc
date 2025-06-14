// 🎓 LEARNING: Express Router for API Endpoints
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// 🎓 LEARNING: POST Route - Create New Request
// This is where your React form data will be sent
router.post('/', async (req, res) => {
  try {
    // 🎓 LEARNING: Extract data from request body
    const { artistName, roleType } = req.body;
    
    // 🎓 LEARNING: Input Validation
    if (!artistName || !roleType) {
      return res.status(400).json({ 
        error: 'Artist name and role type are required' 
      });
    }

    // 🎓 LEARNING: Create new document in MongoDB
    const newRequest = new Request({
      artistName,
      roleType
    });

    // 🎓 LEARNING: Save to database (async operation)
    const savedRequest = await newRequest.save();
    
    // 🎓 LEARNING: Send success response
    res.status(201).json({
      message: 'Request created successfully',
      data: savedRequest
    });

  } catch (error) {
    // 🎓 LEARNING: Error Handling
    console.error('Error creating request:', error);
    res.status(500).json({ 
      error: 'Failed to create request',
      details: error.message 
    });
  }
});

// 🎓 LEARNING: GET Route - Retrieve All Requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 }); // Most recent first
    res.json({
      message: 'Requests retrieved successfully',
      data: requests,
      count: requests.length
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ 
      error: 'Failed to fetch requests' 
    });
  }
});

// 🎓 LEARNING: GET Route - Retrieve Single Request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ 
        error: 'Request not found' 
      });
    }
    
    res.json({
      message: 'Request retrieved successfully',
      data: request
    });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ 
      error: 'Failed to fetch request' 
    });
  }
});

module.exports = router; 