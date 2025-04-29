import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import CustomerDashboard from '../Dashboard/CustomerDashboard';


function AddDelivery() {
  const history = useNavigate();
  const [orderType, setOrderType] = useState('self'); // 'self' or 'gift'
  const [inputs, setInputs] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingPostcode: "",
    // Gift-specific fields
    recipitionFirstName: "",
    recipitionLastName: "",
    recipitionPhone: "",
    recipitionAddress: "",
    recipitionEmail: "",
    giftMessage: "",
    deliveryDate: ""
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
      const deliveryData = {
        orderType,
        ...inputs
      };

      if (orderType !== 'gift') {
        // Remove gift-specific fields if not a gift order
        const { recipitionFirstName, recipitionLastName, recipitionPhone, 
                recipitionAddress, recipitionEmail, giftMessage, deliveryDate, ...rest } = deliveryData;
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
      <CustomerDashboard/>
      <div style={{ 
  maxWidth: "800px", 
  margin: "2rem auto", 
  padding: "2rem", 
  backgroundColor: "#fff", 
  borderRadius: "8px", 
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)"
}}>
  <h2 style={{ 
    color: "#2c3e50", 
    textAlign: "center", 
    marginBottom: "2rem",
    fontSize: "1.8rem"
  }}>Delivery Information</h2>
  
  {/* Order Type Selection - Radio Buttons */}
  <div style={{ 
    margin: "20px 0", 
    display: "flex", 
    justifyContent: "center", 
    gap: "20px",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
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
          accentColor: "#3498db",
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
          accentColor: "#3498db",
          width: "1rem",
          height: "1rem"
        }}
      />
      Send as a Gift
    </label>
  </div>

  <form onSubmit={handleSubmit} style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>
    {/* Common Fields (shown for both types) */}
    <div style={{
      padding: "1.5rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "6px"
    }}>
      <h3 style={{ 
        color: "#3498db", 
        marginTop: "0", 
        marginBottom: "1.5rem", 
        paddingBottom: "0.5rem",
        borderBottom: "1px solid #eee"
      }}>{orderType === 'self' ? 'Your Information' : 'Sender Information'}</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>First Name</label>
          <input 
            type="text" 
            name="firstName" 
            onChange={handleChange} 
            value={inputs.firstName} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            onChange={handleChange} 
            value={inputs.lastName} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Phone Number</label>
          <input 
            type="text" 
            name="phone" 
            onChange={handleChange} 
            value={inputs.phone} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Address</label>
          <input 
            type="text" 
            name="address" 
            onChange={handleChange} 
            value={inputs.address} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Email</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            value={inputs.email} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
      </div>
    </div>

    {/* Gift-specific Fields (only shown when gift is selected) */}
    {orderType === 'gift' && (
      <>
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "6px"
        }}>
          <h3 style={{ 
            color: "#3498db", 
            marginTop: "0", 
            marginBottom: "1.5rem", 
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #eee"
          }}>Recipient Information</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Recipient First Name</label>
              <input 
                type="text" 
                name="recipitionFirstName" 
                onChange={handleChange} 
                value={inputs.recipitionFirstName} 
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s"
                }} 
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Recipient Last Name</label>
              <input 
                type="text" 
                name="recipitionLastName" 
                onChange={handleChange} 
                value={inputs.recipitionLastName} 
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s"
                }} 
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Recipient Phone</label>
              <input 
                type="text" 
                name="recipitionPhone" 
                onChange={handleChange} 
                value={inputs.recipitionPhone} 
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s"
                }} 
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Recipient Address</label>
              <input 
                type="text" 
                name="recipitionAddress" 
                onChange={handleChange} 
                value={inputs.recipitionAddress} 
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s"
                }} 
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Recipient Email</label>
              <input 
                type="email" 
                name="recipitionEmail" 
                onChange={handleChange} 
                value={inputs.recipitionEmail} 
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s"
                }} 
              />
            </div>
          </div>
        </div>
        
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "6px"
        }}>
          <h3 style={{ 
            color: "#3498db", 
            marginTop: "0", 
            marginBottom: "1.5rem", 
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #eee"
          }}>Gift Details</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Gift Message</label>
              <textarea 
                name="giftMessage" 
                onChange={handleChange} 
                value={inputs.giftMessage}
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s",
                  minHeight: "100px",
                  resize: "vertical"
                }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ 
                color: "#555", 
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>Delivery Date</label>
              <input 
                type="date" 
                name="deliveryDate" 
                onChange={handleChange} 
                value={inputs.deliveryDate}
                min={new Date().toISOString().split('T')[0]}
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border-color 0.3s"
                }}
              />
            </div>
          </div>
        </div>
      </>
    )}

    {/* Billing Information (common to both) */}
    <div style={{
      padding: "1.5rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "6px"
    }}>
      <h3 style={{ 
        color: "#3498db", 
        marginTop: "0", 
        marginBottom: "1.5rem", 
        paddingBottom: "0.5rem",
        borderBottom: "1px solid #eee"
      }}>Billing Information</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Billing Name</label>
          <input 
            type="text" 
            name="billingName" 
            placeholder="Billing Name" 
            onChange={handleChange} 
            value={inputs.billingName} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Billing Address</label>
          <input 
            type="text" 
            name="billingAddress" 
            placeholder="Billing Address" 
            onChange={handleChange} 
            value={inputs.billingAddress} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Billing City</label>
          <input 
            type="text" 
            name="billingCity" 
            placeholder="Billing City" 
            onChange={handleChange} 
            value={inputs.billingCity} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ 
            color: "#555", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}>Billing Postcode</label>
          <input 
            type="text" 
            name="billingPostcode" 
            placeholder="Billing Postcode" 
            onChange={handleChange} 
            value={inputs.billingPostcode} 
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              transition: "border-color 0.3s"
            }} 
          />
        </div>
      </div>
    </div>

    <div style={{ 
      marginTop: "20px",
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem"
    }}>
      <button 
        type="button" 
        onClick={() => history(-1)}
        style={{
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#f1f1f1",
          color: "#333",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.3s"
        }}
      >
        Back
      </button>
      <button 
        type="submit"
        style={{
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#3498db",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.3s"
        }}
      >
        Proceed
      </button>
    </div>
  </form>
</div>
    </div>
  );
}

export default AddDelivery;