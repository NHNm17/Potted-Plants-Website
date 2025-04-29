import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';
import CustomerDashboard from '../Dashboard/CustomerDashboard';


export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [items] = useState(state?.items || []);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
    rememberMe: false
  });
  const [codDetails, setCodDetails] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const total = subtotal;

  const validateForm = () => {
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardDetails.nameOnCard.trim()) {
        newErrors.nameOnCard = 'Name on card is required';
      }
      if (!cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Enter expiry as MM/YY';
      }
      if (!cardDetails.cvv.match(/^\d{3}$/)) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
    } else {
      if (!codDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!codDetails.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter a valid 10-digit phone number';
      if (!codDetails.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate('/success', {
      state: {
        orderId: `PP${Date.now()}${Math.floor(Math.random() * 1000)}`,
        amount: total,
        items,
        paymentMethod: 'card'
      }
    });
  };

  const handleCODPayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate('/ordersucess', {
      state: {
        orderId: `PP${Date.now()}${Math.floor(Math.random() * 1000)}`,
        amount: total,
        items,
        details: codDetails,
        paymentMethod: 'cod'
      }
    });
  };

  return (
    <div>
      <CustomerDashboard/>
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="payment-method-selection">
          <button
            className={`payment-btn ${paymentMethod === 'card' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            Pay with Card
          </button>

          <button
            className={`payment-btn ${paymentMethod === 'cod' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('cod')}
          >
            Cash on Delivery
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <div className="checkout-form">
            <h2>Payment Details</h2>
            <label>Card Number</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

            <label>Name on Card</label>
            <input
              type="text"
              value={cardDetails.nameOnCard}
              onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
              placeholder="John Doe"
            />
            {errors.nameOnCard && <p className="error">{errors.nameOnCard}</p>}

            <div className="card-row">
              <div>
                <label>Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                    }
                    setCardDetails({ ...cardDetails, expiryDate: value });
                  }}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                  placeholder="123"
                  maxLength="3"
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
            </div>

            <button className="pay-now-btn" onClick={handleCardPayment}>
              Pay Now
            </button>
          </div>
        ) : (
          <div className="checkout-form">
            <h2>Cash on Delivery Details</h2>
            <label>Full Name</label>
            <input
              type="text"
              value={codDetails.fullName}
              onChange={(e) => setCodDetails({ ...codDetails, fullName: e.target.value })}
              required
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}

            <label>Phone Number</label>
            <input
              type="tel"
              value={codDetails.phone}
              onChange={(e) => setCodDetails({ ...codDetails, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              maxLength="10"
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <label>Email Address</label>
            <input
              type="email"
              value={codDetails.email}
              onChange={(e) => setCodDetails({ ...codDetails, email: e.target.value })}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <button className="pay-now-btn" onClick={handleCODPayment}>
            Proceed
            </button>
          </div>
        )}
      </div>

      <div className="order-summary-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className="order-item">
              <h3>{item.name}</h3>
              <p>Rs {item.price.toFixed(2)} × {item.quantity || 1}</p>
            </div>
          ))}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Total</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}