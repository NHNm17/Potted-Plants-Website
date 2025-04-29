import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateDelivery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    orderType: 'self',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    recipitionFirstName: '',
    recipitionLastName: '',
    recipitionPhone: '',
    recipitionAddress: '',
    recipitionEmail: '',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingPostcode: '',
    giftMessage: '',
    deliveryDate: '',
    deliveryType: 'standard'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/Delivery/${id}`);
        
        if (!response.data.delivery) {
          throw new Error('Delivery data not found in response');
        }
        
        const deliveryData = response.data.delivery;
        if (deliveryData.deliveryDate) {
          deliveryData.deliveryDate = deliveryData.deliveryDate.split('T')[0];
        }
        setInputs(deliveryData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || 
               err.message || 
               'Failed to fetch delivery details');
      } finally {
        setLoading(false);
      }
    };
    fetchDelivery();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/Delivery/${id}`, {
        ...inputs,
        recipitionFirstName: inputs.orderType === 'gift' ? inputs.recipitionFirstName : undefined,
        recipitionLastName: inputs.orderType === 'gift' ? inputs.recipitionLastName : undefined,
        recipitionPhone: inputs.orderType === 'gift' ? inputs.recipitionPhone : undefined,
        recipitionAddress: inputs.orderType === 'gift' ? inputs.recipitionAddress : undefined,
        recipitionEmail: inputs.orderType === 'gift' ? inputs.recipitionEmail : undefined,
        giftMessage: inputs.orderType === 'gift' ? inputs.giftMessage : undefined,
        deliveryDate: inputs.orderType === 'gift' ? inputs.deliveryDate : undefined
      });

      alert('Delivery updated successfully!');
      navigate('/DeliveryInfo');
    } catch (err) {
      console.error('Error updating delivery:', err);
      setError(err.response?.data?.error || 'Failed to update delivery. Please check all required fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Update Delivery</h1>
        {error && <div className="error-message">Error: {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Order Type</label>
            <select
              name="orderType"
              value={inputs.orderType}
              onChange={handleChange}
              required
            >
              <option value="self">For Myself</option>
              <option value="gift">Gift</option>
            </select>
          </div>

          <div className="form-section">
            <h3>Sender Information</h3>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {inputs.orderType === 'gift' && (
            <>
              <div className="form-section">
                <h3>Recipient Information</h3>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="recipitionFirstName"
                    value={inputs.recipitionFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="recipitionLastName"
                    value={inputs.recipitionLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="recipitionPhone"
                    value={inputs.recipitionPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="recipitionAddress"
                    value={inputs.recipitionAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="recipitionEmail"
                    value={inputs.recipitionEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Gift Details</h3>
                <div className="form-group">
                  <label>Gift Message</label>
                  <textarea
                    name="giftMessage"
                    value={inputs.giftMessage}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Date</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={inputs.deliveryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-section">
            <h3>Billing Information</h3>
            <div className="form-group">
              <label>Billing Name</label>
              <input
                type="text"
                name="billingName"
                value={inputs.billingName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Billing Address</label>
              <input
                type="text"
                name="billingAddress"
                value={inputs.billingAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Billing City</label>
              <input
                type="text"
                name="billingCity"
                value={inputs.billingCity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Billing Postcode</label>
              <input
                type="text"
                name="billingPostcode"
                value={inputs.billingPostcode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Delivery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDelivery;