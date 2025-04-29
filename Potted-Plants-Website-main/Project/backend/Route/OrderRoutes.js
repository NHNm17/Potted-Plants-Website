const express = require('express');
const router = express.Router();
const Order = require('../Model/OrderModel');
const crypto = require('crypto');

// Save a new order
router.post('/', async (req, res) => {
  try {
    const { orderId, items, amount, paymentMethod, customerDetails } = req.body;

    const newOrder = new Order({
      orderId: crypto.randomBytes(12).toString('hex'),
      items,
      amount,
      paymentMethod,
      customerDetails
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Get all ongoing orders
router.get('/admin/ongoing', async (req, res) => {
  try {
    const orders = await Order.find({ deliveryStatus: { $ne: 'Delivered' } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ongoing orders' });
  }
});

// Assign delivery partner and update status
router.put('/admin/assign/:id', async (req, res) => {
  const { name, contact, vehicle, status } = req.body;
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      {
        deliveryPartner: { name, contact, vehicle },
        deliveryStatus: status || 'Assigned'
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign delivery partner' });
  }
});


module.exports = router;
