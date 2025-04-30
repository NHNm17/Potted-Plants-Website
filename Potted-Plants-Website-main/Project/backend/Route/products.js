const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');

// Helper function for error handling
const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
};

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    handleErrors(res, error);
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    handleErrors(res, error);
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, image, description } = req.body;
    
    // Basic validation
    if (!name || !price || !stock || !image || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = new Product({
      name,
      price,
      stock,
      image,
      description
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    handleErrors(res, error);
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const { name, price, stock, image, description } = req.body;
    
    // Basic validation
    if (!name || !price || !stock || !image || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        stock,
        image,
        description
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    handleErrors(res, error);
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
});
router.get('/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Assume you have delivery details stored with the order
    res.json({
      status: order.status || "Pending",
      estimatedDate: order.estimatedDate || "Not available",
      deliveryID: order.deliveryID || "Not assigned",
      DeliveryPartner: order.DeliveryPartner || "Not assigned",
      DeliveryVehicle: order.DeliveryVehicle || "Not assigned",
      customerDetails: order.customerDetails,
      items: order.items,
      amount: order.amount,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt
    });
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;