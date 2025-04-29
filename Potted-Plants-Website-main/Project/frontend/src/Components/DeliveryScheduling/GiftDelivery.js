import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import './AddDelivery.css';

function GiftDelivery() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    recipitionFirstName: "",
    recipitionLastName: "",
    recipitionPhone: "",
    recipitionAddress: "",
    recipitionEmail: "",
    deliveryType: "",
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingPostcode: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/DeliveryInfo'));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Delivery", {
        firstName: inputs. firstName,
        lastName: inputs. lastName, 
        phone: inputs. phone,   
        address : inputs. senderAddress, 
        recipitionFirstName: inputs.recipitionFirstName,
        recipitionLastName: inputs.recipitionLastName,
        recipitionPhone: inputs.recipitionPhone,
        recipitionAddress: inputs.recipitionAddress,
        recipitionEmail: inputs.recipitionEmail,
        deliveryType: inputs.deliveryType,
        billingName: inputs.billingName,
        billingAddress: inputs.billingAddress,
        billingCity: inputs.billingCity,
        billingPostcode: inputs.billingPostcode,
      });
  
      console.log("Delivery Added:", response.data);
    } catch (error) {
      console.error("Error sending delivery data:", error);
    }
  };

  return (
    <div>
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
      <h2> Delivery Information</h2>
      <form onSubmit={handleSubmit}>
      <label>Sender's First Name</label>
        <br />
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={inputs.firstName} required />
        <br /><br />

        <label>Sender's Last Name</label>
        <br />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={inputs.lastName} required />
        <br /><br />

        <label>Sender's Phone Number</label>
        <br />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} value={inputs.phone} required />
        <br /><br />

        <label>Sender's Address</label>
        <br />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} value={inputs.address} required />
        <br /><br />

        <label>Recipition's First Name</label>
        <br />
        <input type="text" name="recipitionFirstName" placeholder="First Name" onChange={handleChange} value={inputs.recipitionFirstName} required />
        <br /><br />

        <label>Recipition's Last Name</label>
        <input type="text" name="recipitionLastName" placeholder="Last Name" onChange={handleChange} value={inputs.recipitionLastName} required />
        <br /><br />

        <label>Recipition's Phone Number</label>
        <input type="text" name="recipitionPhone" placeholder="Phone Number" onChange={handleChange} value={inputs.recipitionPhone} required />
        <br /><br />

        <label>Recipition's Address</label>
        <input type="text" name="recipitionAddress" placeholder="Recipient Address" onChange={handleChange} value={inputs.recipitionAddress} required />
        <br /><br />

        <label>Recipition's Email</label>
        <input type="email" name="recipitionEmail" placeholder="Email" onChange={handleChange} value={inputs.recipitionEmail} required />
        <br /><br />

        <label>Billing Name</label>
        <input type="text" name="billingName" placeholder="Billing Name" onChange={handleChange} value={inputs.billingName} required />
        <br /><br />

        <label>Billing Address</label>
        <input type="text" name="billingAddress" placeholder="Billing Address" onChange={handleChange} value={inputs.billingAddress} required />
        <br /><br />

        <label>Billing City</label>
        <input type="text" name="billingCity" placeholder="Billing City" onChange={handleChange} value={inputs.billingCity} required />
        <br /><br />

        <label>Billing Postcode</label>
        <input type="text" name="billingPostcode" placeholder="Billing Postcode" onChange={handleChange} value={inputs.billingPostcode} required />
        <br /><br />

        <button type="button" onClick={() => history(-1)}>Back</button>
        <br /><br />
        <button type="submit">Proceed</button>
      </form>
    </div>
    </div>
  );
}

export default GiftDelivery ;