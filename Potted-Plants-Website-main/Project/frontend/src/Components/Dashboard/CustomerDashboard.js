import React from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../context/cartContext";


const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cartCount } = useCart();


  return (
    <div>
      {/* Single unified header container */}
      <div className="nav-header">
        <img src="favicon.ico" alt="Potted Plants SL Logo" className="logo" />


        <ul className="nav-bar">
          <li><Link to="/dashboard" className="active home-a"><h4>Home</h4></Link></li>
          <li><Link to="/product-page" className="active products-a"><h4>Products</h4></Link></li>
          <li><Link to="/wishlist" className="active wishlist-a"><h4>Wishlist</h4></Link></li>
          <li><Link to="/AIchatbot" className="active aichatbot-a"><h4>AI Chatbot</h4></Link></li>
          <li><Link to="/feedback"><h4>Support & Feedbacks</h4></Link></li>
          <li><Link to="/deliverytracking" className="active tracking-a"><h4>Tracking</h4></Link></li>
          <li><Link to="/profile" className="active profile-a"><h4>My Profile</h4></Link></li>
          <li><button onClick={logout} className="logout-btn">Logout</button></li>
        </ul>


        <div className="user-cart-container">
          <h6 className="auth-text">Hi, {user?.name}</h6>
          <button className="cart-button" onClick={() => navigate('/cart')}>
            🛒 <span style={{ marginLeft: '5px' }}>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default CustomerDashboard;



