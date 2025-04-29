import React, { useState } from 'react';
import axios from "axios";
import "./DeliveryTracking.css";
import CustomerDashboard from '../Dashboard/CustomerDashboard';

const DeliveryTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [deliveryData, setDeliveryData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingId) {
      setError("Please enter a Tracking ID.");
      return;
    }
    setError("");

    try {
      const response = await axios.get(`http://localhost:5000/Delivery/${trackingId}`);
      setDeliveryData(response.data);
    } catch (err) {
      setError("Tracking ID not found or delivery details unavailable.");
      setDeliveryData(null);
    }
  };

  return (
    <div>
      <CustomerDashboard/>
    <div className="container">
      <h2 className="heading">Track Your Plant</h2>
      <input
        type="text"
        placeholder="Enter Tracking ID (e.g. PP-2024-5X7Z9)"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="input"
      />
      <button onClick={handleTrack} className="button">Track Order</button>

      {error && <p className="error">{error}</p>}

      {deliveryData && (
        <div className="result">
          <h3>Delivery Status: {deliveryData.status}</h3>
          <p><strong>Current Location:</strong> {deliveryData.currentLocation}</p>
          <p><strong>Estimated Delivery:</strong> {deliveryData.estimatedDate}</p>
          <p><strong>Delivery Partner ID:</strong> {deliveryData.deliveryID}</p>
          <p><strong>Delivery Partner:</strong> {deliveryData.DeliveryPartner}</p>
          <p><strong>Delivery Vehicle:</strong> {deliveryData.DeliveryVehicle}</p>
          
          <button 
            type="button" 
            onClick={() => window.history.back()} 
            className="back-button"
          >
            Back 
          </button>
      
        </div>
      )}
    </div>
    </div>
  );
};

export default DeliveryTracking;