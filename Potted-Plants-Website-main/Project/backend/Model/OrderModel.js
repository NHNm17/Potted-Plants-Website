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
    name: { type: String, required: true },
    contact: { type: String, required: true },
    vehicle: { type: String, required: true },
    regdate: { type: Date, default: Date.now }
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
