import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import CustomerDashboard from '../Dashboard/CustomerDashboard';

function AddDelivery() {
  const history = useNavigate();
  const [orderType, setOrderType] = useState('self');
  const [inputs, setInputs] = useState({
    firstName: "", lastName: "", phone: "", address: "", email: "",
    billingName: "", billingAddress: "", billingCity: "", billingPostcode: "",
    recipitionFirstName: "", recipitionLastName: "", recipitionPhone: "",
    recipitionAddress: "", recipitionEmail: "", giftMessage: "", deliveryDate: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/checkout'));
  };

  const sendRequest = async () => {
    try {
      const deliveryData = { orderType, ...inputs };
      if (orderType !== 'gift') {
        const { recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail, giftMessage, deliveryDate, ...rest } = deliveryData;
        return await axios.post("http://localhost:5000/Delivery", rest);
      }
      return await axios.post("http://localhost:5000/Delivery", deliveryData);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <div>
      <CustomerDashboard />
      <div style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{
          color: "#27ae60",
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "1.8rem"
        }}>Delivery Information</h2>

        {/* Order Type Selection */}
        <div style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "1rem",
          backgroundColor: "#e9f7ef",
          borderRadius: "6px"
        }}>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer"
          }}>
            <input
              type="radio"
              name="orderType"
              value="self"
              checked={orderType === 'self'}
              onChange={() => setOrderType('self')}
              style={{
                accentColor: "#27ae60",
                width: "1rem",
                height: "1rem"
              }}
            />
            Buy for Myself
          </label>

          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer"
          }}>
            <input
              type="radio"
              name="orderType"
              value="gift"
              checked={orderType === 'gift'}
              onChange={() => setOrderType('gift')}
              style={{
                accentColor: "#27ae60",
                width: "1rem",
                height: "1rem"
              }}
            />
            Send as a Gift
          </label>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Sender or Buyer Info */}
          <div style={{ padding: "1.5rem", backgroundColor: "#f4fef6", borderRadius: "6px" }}>
            <h3 style={{
              color: "#27ae60",
              marginTop: "0",
              marginBottom: "1.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #d5f5e3"
            }}>{orderType === 'self' ? 'Your Information' : 'Sender Information'}</h3>

            {['firstName', 'lastName', 'phone', 'address', 'email'].map(field => (
              <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ color: "#2c3e50", fontWeight: "500", fontSize: "0.9rem" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  onChange={handleChange}
                  value={inputs[field]}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #d5f5e3",
                    borderRadius: "4px",
                    fontSize: "1rem"
                  }}
                />
              </div>
            ))}
          </div>

          {/* Gift-specific */}
          {orderType === 'gift' && (
            <>
              <div style={{ padding: "1.5rem", backgroundColor: "#f4fef6", borderRadius: "6px" }}>
                <h3 style={{
                  color: "#27ae60",
                  marginTop: "0",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid #d5f5e3"
                }}>Recipient Information</h3>

                {['recipitionFirstName', 'recipitionLastName', 'recipitionPhone', 'recipitionAddress', 'recipitionEmail'].map(field => (
                  <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#2c3e50", fontWeight: "500", fontSize: "0.9rem" }}>
                      {field.replace('recipition', 'Recipient ').replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type={field.includes('Email') ? 'email' : 'text'}
                      name={field}
                      onChange={handleChange}
                      value={inputs[field]}
                      required
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #d5f5e3",
                        borderRadius: "4px",
                        fontSize: "1rem"
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ padding: "1.5rem", backgroundColor: "#f4fef6", borderRadius: "6px" }}>
                <h3 style={{
                  color: "#27ae60",
                  marginTop: "0",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid #d5f5e3"
                }}>Gift Details</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ color: "#2c3e50", fontWeight: "500", fontSize: "0.9rem" }}>Gift Message</label>
                    <textarea
                      name="giftMessage"
                      onChange={handleChange}
                      value={inputs.giftMessage}
                      required
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #d5f5e3",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        minHeight: "100px"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: "#2c3e50", fontWeight: "500", fontSize: "0.9rem" }}>Delivery Date</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      onChange={handleChange}
                      value={inputs.deliveryDate}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #d5f5e3",
                        borderRadius: "4px",
                        fontSize: "1rem"
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Billing */}
          <div style={{ padding: "1.5rem", backgroundColor: "#f4fef6", borderRadius: "6px" }}>
            <h3 style={{
              color: "#27ae60",
              marginTop: "0",
              marginBottom: "1.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #d5f5e3"
            }}>Billing Information</h3>

            {['billingName', 'billingAddress', 'billingCity', 'billingPostcode'].map(field => (
              <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ color: "#2c3e50", fontWeight: "500", fontSize: "0.9rem" }}>
                  {field.replace('billing', 'Billing ').replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  name={field}
                  onChange={handleChange}
                  value={inputs[field]}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #d5f5e3",
                    borderRadius: "4px",
                    fontSize: "1rem"
                  }}
                />
              </div>
            ))}
          </div>

          <button type="submit" style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#27ae60",
            color: "#fff",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            alignSelf: "center",
            marginTop: "1rem"
          }}>
            Proceed to Checkout
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDelivery;
