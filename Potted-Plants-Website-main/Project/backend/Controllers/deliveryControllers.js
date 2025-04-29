const Delivery = require('../Model/deliveryModel');

// Create new delivery with enhanced validation
const createDelivery = async (req, res) => {
  try {
    const { orderType } = req.body;

    // Validate required fields based on order type
    if (orderType === 'gift') {
      if (!req.body.recipitionFirstName || !req.body.recipitionLastName) {
        return res.status(400).json({ error: 'Recipient name is required for gift orders' });
      }
      if (!req.body.giftMessage) {
        return res.status(400).json({ error: 'Gift message is required' });
      }
      if (!req.body.deliveryDate) {
        return res.status(400).json({ error: 'Delivery date is required for gift orders' });
      }
    }

    // Clean up data based on order type
    const deliveryData = {
      ...req.body,
      // Ensure consistent field naming
      recipientFirstName: req.body.recipitionFirstName || req.body.firstName,
      recipientLastName: req.body.recipitionLastName || req.body.lastName,
      recipientPhone: req.body.recipitionPhone || req.body.phone,
      recipientAddress: req.body.recipitionAddress || req.body.address,
      recipientEmail: req.body.recipitionEmail || req.body.email
    };

    // Remove unnecessary fields for self orders
    if (orderType === 'self') {
      delete deliveryData.recipitionFirstName;
      delete deliveryData.recipitionLastName;
      delete deliveryData.recipitionPhone;
      delete deliveryData.recipitionAddress;
      delete deliveryData.recipitionEmail;
      delete deliveryData.giftMessage;
      delete deliveryData.deliveryDate;
    }

    const delivery = new Delivery(deliveryData);
    await delivery.save();
    
    res.status(201).json({
      message: 'Delivery created successfully',
      delivery
    });
  } catch (error) {
    console.error('Error creating delivery:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all deliveries with formatted response
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({}).sort({ createdAt: -1 });
    res.json({
      count: deliveries.length,
      deliveries
    });
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single delivery with enhanced error handling
const getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    // Format the response based on order type
    const response = {
      ...delivery.toObject(),
      recipientInfo: delivery.orderType === 'gift' ? {
        firstName: delivery.recipitionFirstName,
        lastName: delivery.recipitionLastName,
        phone: delivery.recipitionPhone,
        address: delivery.recipitionAddress,
        email: delivery.recipitionEmail
      } : null
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching delivery:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update delivery with proper validation
const updateDelivery = async (req, res) => {
  try {
    const { orderType } = req.body;
    const updateData = { ...req.body };

    // Validate gift-specific fields if order type is gift
    if (orderType === 'gift') {
      if (!updateData.recipitionFirstName || !updateData.recipitionLastName) {
        return res.status(400).json({ error: 'Recipient name is required for gift orders' });
      }
      if (!updateData.giftMessage) {
        return res.status(400).json({ error: 'Gift message is required' });
      }
      if (!updateData.deliveryDate) {
        return res.status(400).json({ error: 'Delivery date is required for gift orders' });
      }
    } else {
      // Remove gift-specific fields if changing to self order
      delete updateData.recipitionFirstName;
      delete updateData.recipitionLastName;
      delete updateData.recipitionPhone;
      delete updateData.recipitionAddress;
      delete updateData.recipitionEmail;
      delete updateData.giftMessage;
      delete updateData.deliveryDate;
    }

    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.json({
      message: 'Delivery updated successfully',
      delivery
    });
  } catch (error) {
    console.error('Error updating delivery:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete delivery remains the same
const deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.json({ message: 'Delivery deleted successfully' });
  } catch (error) {
    console.error('Error deleting delivery:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery
};
