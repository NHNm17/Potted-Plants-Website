// UserModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'UserAdmin', 'ProductAdmin', 'DeliveryAdmin','DeliveryPartners'],
    default: "customer",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    default: "07xxxxxxxx"
  },
  permissions: {
    type: [String],
    default: []
  },
  vehicleType:{
    type: String,
  },
  vehicleNumber:{
    type: String,
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // Auto-assign permissions based on role
  if (this.role === 'content-admin') {
    this.permissions = ['manage-content'];
  } else if (this.role === 'finance-admin') {
    this.permissions = ['view-finances', 'process-payments'];
  } else if (this.role === 'super-admin') {
    this.permissions = ['*'];
  }
  
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);