import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';

function Nav() {
  const { user } = useAuth();
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <h1>Potted Plants SL - Bringing Nature to Your Home</h1>
      </header>

      <div className="top-bar">
        <img src="favicon.ico" alt="Potted Plants SL Logo" className="logo" />
        <h6 className="auth-links">
          Hi, {user?.name}
        </h6>
        <a href="/cart" className="cart-icon">
          <img src="cart.png" alt="Cart" />
        </a>
      </div>

      {/* Navigation Bar */}
      <ul className="nav-bar">
        <li className="nav-bar">
        <Link to="/" className="active home-a">
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
        <Link to="/DeliveryScheduling" className="active deliveryscheduling -a">
          <h4>Delivery Scheduling</h4>
          </Link>
        </li>
        <li className="nav-bar">
        <Link to="/deliverytracking" className="active tracking-a">
          <h4>Delivery Tracking</h4>
          </Link>
        </li>
        <li className="nav-bar">
          <Link to="/profile" className="active profile-a">
            <h4>My Profile</h4>
          </Link>
        </li>
        <li className="nav-bar">
          <Link to="/logout" className="active logout-a">
            <h4>Logout</h4>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Nav;