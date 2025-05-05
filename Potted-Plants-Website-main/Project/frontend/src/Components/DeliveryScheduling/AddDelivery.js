import React, { useState } from "react";
import "./AddDelivery.css";
import { useNavigate } from "react-router-dom";
import CustomerDashboard from "../Dashboard/CustomerDashboard";

const AddDelivery = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("self");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    recipientFirstName: "",
    recipientLastName: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientEmail: "",
    deliveryDate: "",
    message: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
      orderType,
    };

    fetch("http://localhost:5000/delivery/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Delivery added successfully!");
        console.log(data);
        navigate("/checkout");
      })
      .catch((error) => {
        alert("Failed to add delivery.");
        console.error(error);
      });
  };

  return (
    <div>
      <CustomerDashboard/>
   
    <div className="add-delivery-container">
      <h2>Delivery Information</h2>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="orderType"
            value="self"
            checked={orderType === "self"}
            onChange={() => setOrderType("self")}
          />
          Buy for Myself
        </label>
        <label>
          <input
            type="radio"
            name="orderType"
            value="gift"
            checked={orderType === "gift"}
            onChange={() => setOrderType("gift")}
          />
          Send as a Gift
        </label>
      </div>

      <form className="delivery-form" onSubmit={handleSubmit}>
        <div className="section">
          <h3>Your Information</h3>
          <div className="field-group">
            <div className="field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {orderType === "gift" && (
          <>
            <div className="section">
              <h3>Recipient's Information</h3>
              <div className="field-group">
                <div className="field">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="recipientFirstName"
                    value={inputs.recipientFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="recipientLastName"
                    value={inputs.recipientLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="recipientPhone"
                    value={inputs.recipientPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={inputs.recipientEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label>Address</label>
                  <input
                    type="text"
                    name="recipientAddress"
                    value={inputs.recipientAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <h3>Gift Details</h3>
              <div className="field-group">
                <div className="field">
                  <label>Delivery Date</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={inputs.deliveryDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={inputs.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <button type="submit" className="submit-button" navigate>
          Proceed to Checkout
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddDelivery;
