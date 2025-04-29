import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h1>📬 Contact Us</h1>
        <p className="intro-text">
          Have questions about plant care or our AI chatbot? Reach out to us! 🌱
        </p>

        <div className="info-card">
          <h2 className="section-title">📍 Our Location</h2>
          <p>
            <a href="https://maps.app.goo.gl/MznTaYpSDnioP9wT9" target="_blank" rel="noopener noreferrer">
              653/1,<br />
              Kapuwawewa, Ragama.<br />
              Postal code - 11010
            </a>
          </p>
        </div>

        <div className="cards-container">
          <div className="info-card">
            <h3 className="section-title">📞 Call Us</h3>
            <p>
              📱 +94 (074) 279-9056 <br />
              📞 +94 (072) 499-8153
            </p>
          </div>

          <div className="info-card">
            <h3 className="section-title">📧 Email Us</h3>
            <p>
              📩 pottedplantssl@gmail.com
            </p>
          </div>
        </div>

        <div className="info-card">
          <h3 className="section-title">💬 Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="submit-button">
              📩 Send Message
            </button>
          </form>
        </div>

        <a href="/" className="back-button">⬅ Back to Home</a>
      </div>
    </div>
  );
};

export default ContactUs;