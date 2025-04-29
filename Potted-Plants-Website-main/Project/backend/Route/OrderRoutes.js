const express = require("express");
const router = express.Router();

const { getOrders, createOrder, deleteOrder } = require("../Controllers/OrderController");

router.get("/", getOrders); // GET /orders
router.post("/", createOrder); // POST /orders
router.delete("/:id", deleteOrder); // DELETE /orders

module.exports = router;
