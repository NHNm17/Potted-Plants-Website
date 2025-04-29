import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>🌿 About Us</h1>
        <p className="intro-text">
          Welcome to <strong>Plant Care AI Chatbot</strong> – your intelligent assistant for all things plant care! 🌱 Whether you're a seasoned plant parent or just starting your journey, our AI-powered chatbot is here to provide expert guidance.
        </p>

        <div className="info-card">
          <h2 className="mission-title">🌼 Our Mission</h2>
          <p>
            We aim to make plant care <strong>simple, accessible, and enjoyable</strong> for everyone. By combining AI technology with expert knowledge, we ensure that your green companions receive the best care possible. Our chatbot provides instant advice on watering, sunlight, fertilization, and troubleshooting plant issues.
          </p>
        </div>

        <div className="cards-container">
          <div className="info-card">
            <h3 className="offer-title">💡 What We Offer</h3>
            <ul className="offer-list">
              <li>🌿 AI-powered plant care tips</li>
              <li>💧 Personalized watering schedules</li>
              <li>🛒 Intelligent product recommendations</li>
              <li>🌞 Light & soil condition analysis</li>
              <li>📝 24/7 chatbot support</li>
            </ul>
          </div>

          <div className="info-card">
            <h3 className="vision-title">🌍 Our Vision</h3>
            <p>
              We envision a world where <strong>everyone can successfully grow plants</strong>, regardless of their experience. By bridging the gap between technology and nature, we empower people to nurture their green spaces with confidence.
            </p>
          </div>
        </div>

        <div className="info-card">
          <h3 className="community-title">🌱 Join Our Community</h3>
          <p>
            Become a part of the growing community of plant lovers who rely on our chatbot for expert advice. Whether you're troubleshooting a plant problem or looking for the best products, we've got you covered.
          </p>
        </div>

        <a href="/" className="back-button">⬅ Back to Home</a>
      </div>
    </div>
  );
};

export default AboutUs;