const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  date: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model("OrderModel", orderSchema);

module.exports = Order;
