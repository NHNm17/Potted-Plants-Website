import React from 'react'
import { Link } from 'react-router-dom';
import "./home.css"
import { useAuth } from '../context/authContext'


function Home() {
    const {user, logout} = useAuth;
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
        <a href="/cart" className="cart-icon">
          <img src="cart.png" alt="Cart" />
        </a>
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
        <button onClick={logout} className="logout-btn">
        Logout
      </button>
        </li>
      </ul>
    </div>
      
    <div className="home-container">
      
      {/* Hero Section */}
      <section className="hero-section">
        <h2>Welcome to Potted Plants SL</h2>
        <p>Bringing Nature to Your Doorstep with Fresh and Healthy Plants!</p>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Our Bestsellers</h2>
        <div className="products">
          <div className="product-card">
            <img src="spider plant.jpg" alt="Spider Plant" />
            <h3>Spider Plant <pre>Rs.600</pre></h3>
            <p>Air purifying & easy maintenance</p>
            <button className="add-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
          <div className="product-card">
            <img src="Nuga plant.jpg" alt="Nuga Plant" />
            <h3>Nuga Plant <pre>Rs.600</pre></h3>
            <p>Brings good luck & prosperity</p>
            <button className="add-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </section>

    </div>
  
    </div>
  )
}

export default Home
