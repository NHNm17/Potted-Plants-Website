const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cod'],
    required: true
  },
  customerDetails: {
    fullName: String,
    phone: String,
    email: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Assigned', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },
  deliveryPartner: {
    name: String,
    contact: String,
    vehicle: String
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
