import React from "react";
import './Footer.css';

function Footer() {
    return(
        <div>
            {/* Footer Section */}
      <footer className="footer">
        <ul>
          <a href="aboutus">About Us</a>
          <a href="contactus">Contact</a>
          <a href="privacypolicy">Privacy Policy</a>
          <a href="termsandcondition">Terms and Conditions</a>
        </ul>
        <p>&copy; 2025 Potted Plants SL. All rights reserved.</p>
        <div className="social-links">
          <p>Follow Us</p>
          <a href="https://www.facebook.com/share/1GnuHbaF1u/" target="_blank" rel="noopener noreferrer">
            <img src="fb.png" alt="Facebook" />
          </a>
          <a href="https://www.tiktok.com/@potted_plants_sl?_t=ZS-8uhuJZkcqHA&_r=1" target="_blank" rel="noopener noreferrer">
            <img src="tiktok.png" alt="TikTok" />
          </a>
          <a href="https://www.instagram.com/potted_plants_sl?igsh=MTZwa3VvZTJkejNnNg==" target="_blank" rel="noopener noreferrer">
            <img src="ins.jpg" alt="Instagram" />
          </a>
        </div>
      </footer>
        </div>
    )
}
export default Footer