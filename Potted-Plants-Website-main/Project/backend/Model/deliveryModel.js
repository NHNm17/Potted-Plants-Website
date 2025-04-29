const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  // Common fields
  orderType: {
    type: String,
    enum: ['self', 'gift'],
    required: [true, 'Order type is required'],
    default: 'self'
  },
  
  // Sender/User information
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  
  // Recipient information (for gifts)
  recipitionFirstName: {
    type: String,
    trim: true,
    required: function() { return this.orderType === 'gift'; }
  },
  recipitionLastName: {
    type: String,
    trim: true,
    required: function() { return this.orderType === 'gift'; }
  },
  recipitionPhone: {
    type: String,
    trim: true,
    required: function() { return this.orderType === 'gift'; }
  },
  recipitionAddress: {
    type: String,
    trim: true,
    required: function() { return this.orderType === 'gift'; }
  },
  recipitionEmail: {
    type: String,
    trim: true,
    lowercase: true,
    required: function() { return this.orderType === 'gift'; },
    
  },
  
  // Billing information
  billingName: {
    type: String,
    required: [true, 'Billing name is required'],
    trim: true
  },
  billingAddress: {
    type: String,
    required: [true, 'Billing address is required'],
    trim: true
  },
  billingCity: {
    type: String,
    required: [true, 'Billing city is required'],
    trim: true
  },
  billingPostcode: {
    type: String,
    required: [true, 'Billing postcode is required'],
    trim: true
  },
  
  // Gift-specific fields
  giftMessage: {
    type: String,
    trim: true,
    required: function() { return this.orderType === 'gift'; }
  },
  deliveryDate: {
    type: Date,
    validate: {
      validator: function(value) {
        // Allow today or future dates
        return value >= new Date(new Date().setHours(0, 0, 0, 0));
      },
      message: 'Delivery date must be today or in the future'
    }
  },
  deliveryType: {
    type: String,
    enum: ['standard', 'express', 'overnight'],
    default: 'standard'
  },
  
  // System fields
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Auto-manage createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add pre-save hook to update timestamps
DeliverySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Delivery', DeliverySchema);