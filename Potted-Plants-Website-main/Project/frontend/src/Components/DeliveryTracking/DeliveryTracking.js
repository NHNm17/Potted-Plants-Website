import React, { useState } from "react";
import axios from "axios";
import "./DeliveryTracking.css";
import CustomerDashboard from "../Dashboard/CustomerDashboard";
import { useAuth } from "../context/authContext";

const DeliveryTracking = () => {
  const { user } = useAuth();
  const [orderId, setTrackingId] = useState("");
  const [deliveryData, setDeliveryData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId) {
      setError("Please enter an Order ID.");
      return;
    }
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/orders/${orderId}`
      );
      setDeliveryData(response.data);
      console.log("Fetched Delivery Data:", deliveryData);

    } catch (err) {
      console.error(err);
      setError("Order ID not found");
      setDeliveryData(null);
    }
  };

  return (
    <div>
      <CustomerDashboard />
      <div className="container">
        <h2 className="heading">Track Your Plant</h2>
        <input
          type="text"
          placeholder="Enter Order ID (e.g. PP-2024-5X7Z9)"
          value={orderId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="input"
        />
        <button onClick={handleTrack} className="button">
          Track Order
        </button>

        {error && <p className="error">{error}</p>}

        {deliveryData && (
          <div className="result">
            <h3>Delivery Status: {deliveryData.deliveryStatus || "Pending"}</h3>
            <p>
              <strong>Estimated Delivery:</strong> 2–3 days
            </p>
            <p>
              <strong>Delivery Partner:</strong>{" "}
              {deliveryData.deliveryPartner?.name || "Not Assigned"}
            </p>
            <p>
              <strong>Delivery Vehicle Number:</strong>{" "}
              {deliveryData.deliveryPartner?.vehicle || "N/A"}
            </p>

            <h4>Order Details</h4>
            <p>
              <strong>Order ID:</strong> {deliveryData.orderId}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(deliveryData.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Customer Name:</strong> {user?.fullName || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            <p>
              <strong>Payment Method:</strong> {deliveryData.paymentMethod}
            </p>
            <p>
              <strong>Total Amount:</strong> Rs. {deliveryData.amount}
            </p>

            <h5>Items Ordered:</h5>
            <ul>
              {deliveryData.items?.map((item, index) => (
                <li key={index}>
                  {item.name} — {item.quantity} × Rs. {item.price}
                </li>
              ))}
            </ul>

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
