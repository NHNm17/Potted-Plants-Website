import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Nav from "../Layout/Nav";


function UpdateAddress() {
  const history = useNavigate();
  const { id } = useParams(); // Get address ID from URL
  const [inputs, setInputs] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });

  // Fetch existing address details
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/address/${id}`);
        setInputs(response.data); // Set existing values
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchAddress();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Updated Address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/address/${id}`, {
        type: inputs.type,
        street: inputs.street,
        city: inputs.city,
        state: inputs.state,
        zipcode: inputs.zipcode,
      });
      console.log("Address Updated:", inputs);
      history("/address"); // Redirect after update
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "#e8f5e9", borderRadius: "10px" }}>
        <h2>Update Address</h2>
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAddress;
