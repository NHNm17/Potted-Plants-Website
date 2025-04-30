import React from 'react'
import "./home.css"
import Nav from '../Layout/Nav'


function Home() {
  return (
    <div>
      <Nav/>
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
            <img src="spiderplant.jpg" alt="Spider Plant" />
            <h3>Spider Plant <pre>Rs.600</pre></h3>
            <p>Air purifying & easy maintenance</p>
            <button className="add-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
          <div className="product-card">
            <img src="Nugaplant.jpg" alt="Nuga Plant" />
            <h3>Nuga plant <pre>Rs.600</pre></h3>
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
