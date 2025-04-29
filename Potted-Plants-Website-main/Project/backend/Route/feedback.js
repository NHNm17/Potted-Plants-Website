const express = require('express');
const router = express.Router();
const Feedback = require('../Model/Feedback');
const multer = require('multer');
const path = require('path');

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/feedback-images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Create new feedback/support request
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, type, product, rating, message } = req.body;
    
    const feedbackData = {
      name,
      email,
      type,
      product,
      message,
      imageUrl: req.file ? `/feedback-images/${req.file.filename}` : undefined
    };

    if (type === 'feedback') {
      feedbackData.rating = rating;
    }

    const feedback = new Feedback(feedbackData);
    await feedback.save();

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all feedback/support requests
router.get('/', async (req, res) => {
  try {
    const { type, status, email } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (email) filter.email = email;

    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Update feedback
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, type, rating, message } = req.body;
    
    const updateData = {
      name,
      email,
      type,
      message,
      updatedAt: Date.now()
    };

    if (type === 'feedback') {
      updateData.rating = rating;
    }

    if (req.file) {
      updateData.imageUrl = `/feedback-images/${req.file.filename}`;
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;