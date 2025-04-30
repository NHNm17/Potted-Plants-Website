import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li><Link to="/profile" className="active">Profile</Link></li>
          <li><Link to="/orderhistory">My Orders</Link></li>
          <li><Link to="/DeliveryInfo">Delivery Options</Link></li>
  
        </ul>
        <button className="back-btn" onClick={() => navigate("/product-page")}>
          &larr; Back to Dashboard
        </button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      {/* Profile Content */}
      <main className="profile-content">
        <h2>My Profile</h2>
        <div className="profile-details">
          <h3>First Name: {user?.name}</h3>
          <h3>Email: {user?.email}</h3>
          <h3>Phone: {user?.phone}</h3>
          <Link to="/update-profile" className="bttn-update">Update Profile</Link>
        </div>
      </main>
      
    </div>
  );
}

export default Profile;
