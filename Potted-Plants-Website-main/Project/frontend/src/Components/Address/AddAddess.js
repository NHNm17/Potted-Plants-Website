import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import Nav from '../Layout/Nav';
import "./AddAddress.css"

function AddAddress() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
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
    sendRequest().then(() => history('/'));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/address", {
        type: inputs.type,
        street: inputs.street,
        city: inputs.city,
        state: inputs.state,
        zipcode: inputs.zipcode
      });

      console.log("Address Added:", response.data);
    } catch (error) {
      console.error("Error sending address data:", error);
    }
  };

  return (
    <div>
      <Nav/>
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
        <h2> Add New Address</h2>
        <form onSubmit={handleSubmit}>
          <label>Type</label>
          <br />
          <select name="type" onChange={handleChange} value={inputs.type} required>
            <option value="">Select Type</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <br /><br />

          <label>Street</label>
          <input type="text" name="street" placeholder="Street Address" onChange={handleChange} value={inputs.street} required />
          <br /><br />

          <label>City</label>
          <input type="text" name="city" placeholder="City" onChange={handleChange} value={inputs.city} required />
          <br /><br />

          <label>State</label>
          <input type="text" name="state" placeholder="State" onChange={handleChange} value={inputs.state} required />
          <br /><br />

          <label>Zip Code</label>
          <input type="text" name="zipcode" placeholder="Zip Code" onChange={handleChange} value={inputs.zipcode} required />
          <br /><br />

          <button type="button" onClick={() => history(-1)}>Back</button>
          <br /><br />
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
}

export default AddAddress;
