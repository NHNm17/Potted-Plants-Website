import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1>🔒 Privacy Policy</h1>
        <p className="intro-text">
          We value your privacy and are committed to protecting your personal information. Please read this policy carefully.
        </p>

        <div className="policy-section">
          <h2 className="section-title">📌 Information We Collect</h2>
          <p>
            We collect the following types of information when you use our chatbot:
          </p>
          <ul className="policy-list">
            <li>Personal details (such as name and email) when you contact us.</li>
            <li>Messages and queries you submit in the chatbot.</li>
            <li>Technical data like IP address, browser type, and device information.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="section-title">🔍 How We Use Your Information</h2>
          <p>
            Your information helps us improve our services. We use it for:
          </p>
          <ul className="policy-list">
            <li>Providing chatbot responses and recommendations.</li>
            <li>Enhancing chatbot accuracy based on user interactions.</li>
            <li>Responding to inquiries and support requests.</li>
            <li>Ensuring the security of our platform.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="section-title">🛡 Data Protection & Security</h2>
          <p>
            We implement strong security measures to protect your personal data from unauthorized access, loss, or misuse.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-title">🌍 Third-Party Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information. However, we may share data with trusted third parties who assist in operating our chatbot, as long as they comply with privacy laws.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-title">📅 Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page.
          </p>
        </div>

        <div className="back-button-container">
          <a href="/" className="back-button">⬅ Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;