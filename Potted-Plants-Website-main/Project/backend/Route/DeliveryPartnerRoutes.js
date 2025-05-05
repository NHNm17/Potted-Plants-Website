const express = require("express");
const router = express.Router();
const DeliveryPartner = require("../Model/UserModel");

// GET all delivery partners
router.get("/", async (req, res) => {
  try {
    const partners = await DeliveryPartner.find();
    res.json({ success: true, data: partners });
  } catch (err) {
    console.error("Error fetching delivery partners:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET single delivery partner by ID
router.get("/:id", async (req, res) => {
  try {
    const partner = await DeliveryPartner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    res.json({ success: true, data: partner });
  } catch (err) {
    console.error("Error fetching delivery partner:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST: Create a new delivery partner
router.post("/", async (req, res) => {
    try {
      const { name, phone, vehicleType, vehicleNumber } = req.body;
  
      // Basic validation (optional)
      if (!name || !phone || !vehicleType) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      const newPartner = new DeliveryPartner({
        name,
        phone,
        vehicleType,
        vehicleNumber
      });
  
      const savedPartner = await newPartner.save();
      res.status(201).json({ success: true, data: savedPartner });
    } catch (err) {
      console.error("Error adding delivery partner:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

module.exports = router;
