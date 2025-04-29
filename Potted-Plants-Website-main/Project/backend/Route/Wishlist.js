const express = require("express");
const router = express.Router();
const wishlistController = require("../Controllers/Wishlist");


// Routes
router.post("/add", wishlistController.addToWishlist);
router.post("/remove", wishlistController.removeFromWishlist);
router.get("/:userId", wishlistController.getWishlist);
router.post("/update", wishlistController.updateWishlistQuantity);


module.exports = router;