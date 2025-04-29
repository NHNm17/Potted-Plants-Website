import React from 'react';
import { useAuth } from '../context/authContext';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {cartCount}= useCart();

  return (
    <div>
      <div>
      {/* Header Section */}
      <header className="header">
        <h1>Potted Plants SL - Bringing Nature to Your Home</h1>
      </header>

      <div className="top-bar">
        <img src="favicon.ico" alt="Potted Plants SL Logo" className="logo" />
        <h6 className="auth-links">
          Hi,  {user?.name}  </h6>
          <button className="cart-button" onClick={() => navigate('/cart')}>
            🛒
            <span style={{ marginLeft: '5px' }}>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>

      </div>

      {/* Navigation Bar */}
      <ul className="nav-bar">
        <li className="nav-bar">
        <Link to="/dashboard" className="active home-a">
          <h4>Home</h4>
        </Link>
        </li>
        <li className="nav-bar">
        <Link to="/product-page" className="active products-a">
          <h4>Products</h4>
          </Link>
        </li>
        <li className="nav-bar">
        <Link to="/wishlist" className="active wishlist-a">
          <h4>Wishlist</h4>
          </Link>
        </li>
        <li className="nav-bar">
        <Link to="/AIchatbot" className="active aichatbot-a">
          <h4>AI chatbot</h4>
          </Link>
        </li>
        <li className="nav-bar">
        <Link to="/feedback">
          <h4>Support & Feedbacks</h4>
          </Link>
        </li>
        <li className="nav-bar">
        <Link to="/deliverytracking" className="active tracking-a">
          <h4>Tracking</h4>
          </Link>
        </li>
        <li className="nav-bar">
          <Link to="/profile" className="active profile-a">
            <h4>My Profile</h4>
          </Link>
        </li>
        <li className="nav-bar">
        <button onClick={logout} className="logout-btn">
        Logout
      </button>
        </li>
      </ul>
    </div>
    </div>



    
  );
};

export default CustomerDashboard;