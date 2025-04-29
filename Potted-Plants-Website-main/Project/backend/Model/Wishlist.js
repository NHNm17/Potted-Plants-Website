const mongoose = require("mongoose");


const WishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
}, { timestamps: true });


module.exports = mongoose.model("Wishlist", WishlistSchema);