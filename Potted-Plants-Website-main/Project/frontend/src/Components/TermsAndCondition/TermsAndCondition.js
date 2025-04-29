import React from 'react';

import './TermsAndCondition.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>📜 Terms and Conditions</h1>
        <p className="intro-text">
          Please read these Terms and Conditions carefully before using our chatbot.
        </p>

        <div className="terms-section">
          <h2 className="section-title">✅ Acceptance of Terms</h2>
          <p>
            By accessing and using our Plant Care AI Chatbot, you agree to comply with these terms. If you do not agree, please refrain from using the service.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">🌱 Use of the Chatbot</h2>
          <p>
            Our chatbot provides plant care tips and recommendations. However:
          </p>
          <ul className="terms-list">
            <li>It does not replace professional gardening or medical advice.</li>
            <li>Responses are generated using AI and may not always be 100% accurate.</li>
            <li>Users should verify critical information from trusted sources.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="section-title">🔒 User Responsibilities</h2>
          <p>
            Users agree not to:
          </p>
          <ul className="terms-list">
            <li>Misuse the chatbot for spam or harmful content.</li>
            <li>Provide false or misleading information.</li>
            <li>Attempt to hack or disrupt the chatbot's functionality.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="section-title">🌍 Intellectual Property</h2>
          <p>
            All chatbot responses, content, and website design are the property of Plant Care AI Chatbot. Unauthorized reproduction or distribution is prohibited.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">⚠ Limitation of Liability</h2>
          <p>
            We are not responsible for any direct or indirect damages resulting from chatbot use, including incorrect plant care advice. Users assume full responsibility.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">📅 Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the chatbot means you accept the updated terms.
          </p>
        </div>

        <div className="back-button-container">
          <a href="/" className="back-button">⬅ Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;