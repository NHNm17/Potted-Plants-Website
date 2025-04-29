const Address = require("../Model/AddressModel");

// Get all addresses for logged-in user
const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new address
const addAddress = async (req, res) => {
  try {
    const { type, street, city, state, zipcode } = req.body;
    
    // Validate required fields
    if (!type || !street || !city || !state || !zipcode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = new Address({ 
      type, 
      street, 
      city, 
      state, 
      zipcode, 
      user: req.user.id 
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to add address", error: error.message });
  }
};

// Get address by ID
const getById = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update address by ID
const updateAddress = async (req, res) => {
  try {
    const { type, street, city, state, zipcode } = req.body;
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update fields
    address.type = type || address.type;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipcode = zipcode || address.zipcode;

    await address.save();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete address by ID
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { 
  getAddress, 
  addAddress, 
  getById, 
  updateAddress, 
  deleteAddress 
};