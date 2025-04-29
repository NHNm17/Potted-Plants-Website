const express = require('express');
const router = express.Router();
const {
  createDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery
} = require('../Controllers/deliveryControllers');

// Create new delivery
router.post('/', createDelivery);

// Get all deliveries
router.get('/', getAllDeliveries);

// Get single delivery
router.get('/:id', getDelivery);

// Update delivery
router.put('/:id', updateDelivery);

// Delete delivery
router.delete('/:id', deleteDelivery);

module.exports = router;