

import {Route, Routes} from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Components/context/cartContext';
import { AuthProvider } from './Components/context/authContext';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import CustomerDashboard from './Components/Dashboard/CustomerDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import Orders from "./Components/orders/Orders";
import AddressBook from "./Components/Address/AddressBook";
import AddAddress from "./Components/Address/AddAddess";
import Home from "./Components/Home/Home";
import DashboardHome from "./Components/Home/DashboardHome"
import Profile from "./Components/account/Profile";
import UpdateAddress from "./Components/Address/UpdateAddress";
import UpdateProfile from "./Components/account/UpdateProfile";
import ProductDashboard from "./Components/Dashboard/ProductDashboard";
import ProductPage from "./Components/ProductPage/ProductPage";
import Cart from './Components/Cart/Cart';
import Feedback from "./Components/Feedback/Feedback";
import ProductDetail from "./Components/ProductDetails/ProductDetail";
import Checkout from "./Components/Checkout/Checkout";
import Success from "./Components/Checkout/Success/Success";
import AddDelivery from "./Components/DeliveryScheduling/AddDelivery";
import ShowDelivery from "./Components/DeliveryScheduling/ShowDelivery";
import UpdateDelivery from "./Components/DeliveryScheduling/UpdateDelivery";
import DeliveryTracking from "./Components/DeliveryTracking/DeliveryTracking";
import OrderSucess from "./Components/DeliveryScheduling/OrderSucess";
import Footer from "./Components/Footer/Footer";
import Wishlist from './Components/Wishlist/Wishlist';
import React, { useState } from 'react';
import AIchatbot from "./Components/AIchatbot/AIchatbot";
import useCart from './Components/Cart/useCart';




import "./App.css";


function App() {
  const [wishlist, setWishlist] = useState([]);


  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();




  const toggleWishlist = (plant) => {
    setWishlist(prevWishlist =>
      prevWishlist.some(item => item.id === plant.id)
        ? prevWishlist.filter(item => item.id !== plant.id)
        : [...prevWishlist, plant]
    );
  };




  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };
 
  return (
    <div>
      <AuthProvider>
        <CartProvider>
      <React.Fragment>
        <Routes>


          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<DashboardHome/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/update-profile" element={<UpdateProfile/>}/>
          <Route path="/address" element={<AddressBook/>}/>
          <Route path="/AddAddress" element={<AddAddress/>}/>
          <Route path="/UpdateAddress/:id" element={<UpdateAddress/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/customer-dashboard" element={<PrivateRoute><CustomerDashboard/></PrivateRoute>}/>
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/product-dashboard" element={<AdminRoute><ProductDashboard /></AdminRoute>} />
          <Route path="/product-page" element={<ProductPage addToCart={addToCart} toggleWishlist={toggleWishlist} />}/>
          <Route path="/productdetail" element={<ProductDetail/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/adddelivery" element={<AddDelivery/>}/>
          <Route path="/DeliveryInfo" element={<ShowDelivery/>}/>
          <Route path="/UpdateDelivery/:id" element={<UpdateDelivery/>}/>
          <Route path="/deliverytracking" element={<DeliveryTracking/>}/>
          <Route path="/ordersucess" element={<OrderSucess/>}/>
              <Route
                path="/wishlist"
                element={<Wishlist wishlistItems={wishlist} removeFromWishlist={removeFromWishlist} />}
              />
          <Route path="/aichatbot" element={<AIchatbot/>}/>
         
         
        </Routes>
        <ToastContainer />
      </React.Fragment>
      <Footer/>
      </CartProvider>
      </AuthProvider>
    </div>
  );
}


export default App;





