import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <h1>Potted Plants SL - Bringing Nature to Your Home</h1>
      </header>

      <div className="top-bar">
        <img src="favicon.ico" alt="Potted Plants SL Logo" className="logo" />
        <h6 className="auth-links">
          Hi,  <a href="/login">Login</a> OR <a href="/register">Sign Up</a>
        </h6>
        <a href="/cart" className="cart-icon">
          <img src="cart.png" alt="Cart" />
        </a>
      </div>

      {/* Navigation Bar */}
      <ul className="nav-bar">
        <li className="nav-bar">
        <Link to="/home" className="active home-a">
          <h4>Home</h4>
        </Link>
        </li>
        <li className="nav-bar">
        <Link to="/products" className="active products-a">
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
          <Link to="/register" className="active profile-a">
            <h4>Register</h4>
          </Link>
        </li>
        <li className="nav-bar">
          <Link to="/login" className="active logout-a">
            <h4>Log In</h4>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Nav;