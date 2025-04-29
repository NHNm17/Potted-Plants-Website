const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');

// Add note to product
router.post('/products/:id/notes', async (req, res) => {
  try {
    const { content } = req.body;
    
    // Validate input
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Note content is required and must be a string' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add the new note
    product.notes.push({ content });
    await product.save();

    res.status(201).json({
      success: true,
      data: product.notes[product.notes.length - 1] // Return the newly added note
    });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Server error while adding note' });
  }
});

// Get all notes for a product
router.get('/products/:id/notes', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('notes');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      data: product.notes
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Server error while fetching notes' });
  }
});

module.exports = router;