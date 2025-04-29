
const express = require("express");
const router = express.Router();
const { protect } = require('../Middleware/auth');

const {  getAddress, addAddress, deleteAddress, getById, updateAddress } = require("../Controllers/AddressController");

router.get("/", protect, getAddress); // GET /address
router.post("/", protect, addAddress); // POST /address
router.put("/:id", protect,  getById); // GET /address
router.delete("/:id", protect, deleteAddress); // DELETE /address

module.exports = router;
