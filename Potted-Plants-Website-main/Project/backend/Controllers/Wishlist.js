const Wishlist = require("../Model/Wishlist");
const Product = require("../Model/Product");
const mongoose = require('mongoose');


// Validation for userId and productId
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && id.length === 24;


exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;


        // Validate ObjectId format
        if (!validateObjectId(userId) || !validateObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID or product ID format" });
        }


        // Check if the product exists
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }


        let wishlist = await Wishlist.findOne({ userId });


        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [{ productId, quantity }] });
        } else {
            const existingProduct = wishlist.products.find(p => p.productId.toString() === productId);


            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                wishlist.products.push({ productId, quantity });
            }
        }


        await wishlist.save();
        res.status(200).json({ success: true, message: "Product added to wishlist", wishlist });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;


        if (!validateObjectId(userId) || !validateObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID or product ID format" });
        }


        let wishlist = await Wishlist.findOne({ userId });


        if (!wishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }


        const productIndex = wishlist.products.findIndex(p => p.productId.toString() === productId);


        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in wishlist" });
        }


        wishlist.products.splice(productIndex, 1);
        await wishlist.save();


        res.status(200).json({ success: true, message: "Product removed from wishlist", wishlist });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};




exports.updateWishlistQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;


        if (!validateObjectId(userId) || !validateObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID or product ID format" });
        }


        if (quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
        }


        let wishlist = await Wishlist.findOne({ userId });


        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [{ productId, quantity: 1 }] });
            await wishlist.save();
            return res.status(200).json({ success: true, message: "Product added to wishlist", wishlist });
        }


        const product = wishlist.products.find(p => p.productId.toString() === productId);


        if (!product) {
            wishlist.products.push({ productId, quantity: 1 });
            await wishlist.save();
            return res.status(200).json({ success: true, message: "Product added to wishlist", wishlist });
        }


        product.quantity = quantity;
        await wishlist.save();


        res.status(200).json({ success: true, message: "Wishlist updated successfully", wishlist });
    } catch (error) {
        console.error("Error updating wishlist:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};




exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;


        // Validate ObjectId format
        if (!validateObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }


        const wishlist = await Wishlist.findOne({ userId }).populate("products.productId");


        if (!wishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }


        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};