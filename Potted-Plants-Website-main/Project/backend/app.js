//pass - HjR43js3YttMAODU


const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require("mongoose");





const addressRoute = require("./Route/AddressRoutes");
const userRoute = require("./Route/UserRoutes");
const adminRoute = require("./Route/AdminRoutes");
const productRoutes = require('./Route/products');
const feedbackRoutes = require('./Route/feedback');
const noteRoutes = require('./Route/notes');
const deliveryRoutes  = require("./Route/deliveryRoute");
const wishlist = require('./Route/Wishlist');
const orderRoutes = require("./Route/OrderRoutes");
const deliveryPartnerRoutes = require("./Route/DeliveryPartnerRoutes");



dotenv.config();
const app = express();




//Middleware
app.use(express.json());
app.use(cors());

app.use("/address",addressRoute)
app.use('/auth',userRoute);
app.use('/admin',adminRoute);
app.use('/products', productRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/api/notes', noteRoutes);
app.use('/Delivery', deliveryRoutes );
app.use('/wishlist', wishlist);
app.use('/orders', orderRoutes);
app.use("/delivery-partners", deliveryPartnerRoutes);




mongoose.connect("mongodb+srv://admin:HjR43js3YttMAODU@cluster0.afkqg.mongodb.net/PottedPlantsSL")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
    console.log("Server is running on port 5000")
})
.catch((err)=> console.log((err)));

