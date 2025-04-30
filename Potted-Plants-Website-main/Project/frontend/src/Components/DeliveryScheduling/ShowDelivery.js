import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";
import "./DeliveryBook.css";


function DeliveryBook() {
  const [deliveries, setDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/Delivery")
      .then((res) => {
        setDeliveries(res.data.deliveries || []);
      })
      .catch((error) => console.error("Error fetching deliveries:", error))
      .finally(() => setLoading(false));
  }, []);


  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab === 'all') return true;
    return delivery.orderType === activeTab;
  });


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Delivery/${id}`);
      if (response.status === 200) {
        setDeliveries(prev => prev.filter(d => d._id !== id));
      }
    } catch (error) {
      console.error("Error deleting delivery:", error);
    }
  };


  if (loading) {
    return <div className="loading-screen"><p>Loading deliveries...</p></div>;
  }


  return (
    <div className="profile-container">
      <aside className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/orderhistory">My Orders</Link></li>
          <li><Link to="/DeliveryInfo" className="active">Delivery Options</Link></li>
        </ul>
        <button className="back-btn" onClick={() => navigate("/product-page")}>&larr; Back to Dashboard</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>


      <main className="profile-content">
        <div className="delivery-book">
          <div className="delivery-header">
            <h2>Delivery Records</h2>
          </div>


          <div className="delivery-tabs">
            {["all", "self", "gift"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              >
                {tab === "all" ? "All Deliveries" :
                 tab === "self" ? "Buy for Myself" : "Send as Gift"}
              </button>
            ))}
          </div>


          <div className="delivery-list">
            {filteredDeliveries.length === 0 ? (
              <p className="no-records">
                {activeTab === 'all' ? 'No deliveries found.' :
                 activeTab === 'self' ? 'No "Buy for Myself" deliveries found.' :
                 'No "Send as Gift" deliveries found.'}
              </p>
            ) : (
              filteredDeliveries.map((delivery) => (
                <div key={delivery._id} className="card">
                  <h3>
                    {delivery.orderType === 'gift' ? 'Gift Recipient' : 'Recipient'}:{" "}
                    {delivery.orderType === 'gift'
                      ? `${delivery.recipitionFirstName} ${delivery.recipitionLastName}`
                      : `${delivery.firstName} ${delivery.lastName}`}
                  </h3>
                  <p><strong>Delivery ID:</strong> {delivery._id}</p>
                  <p><strong>Order Type:</strong> {delivery.orderType === 'gift' ? 'Send as Gift' : 'Buy for Myself'}</p>


                  {delivery.orderType === 'gift' && (
                    <>
                      <p><strong>From:</strong> {delivery.firstName} {delivery.lastName}</p>
                      <p><strong>Gift Message:</strong> {delivery.giftMessage}</p>
                      <p><strong>Delivery Date:</strong> {new Date(delivery.deliveryDate).toLocaleDateString()}</p>
                    </>
                  )}


                  <p><strong>Phone:</strong> {delivery.orderType === 'gift' ? delivery.recipitionPhone : delivery.phone}</p>
                  <p><strong>Address:</strong> {delivery.orderType === 'gift' ? delivery.recipitionAddress : delivery.address}</p>
                  <p><strong>Email:</strong> {delivery.orderType === 'gift' ? delivery.recipitionEmail : delivery.email}</p>
                  <p><strong>Billing Name:</strong> {delivery.billingName}</p>
                  <p><strong>Billing Address:</strong> {delivery.billingAddress}, {delivery.billingCity}, {delivery.billingPostcode}</p>


                  <div className="card-actions">
                    <Link to={`/UpdateDelivery/${delivery._id}`} className="btn edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(delivery._id)} className="btn delete-btn">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


export default DeliveryBook;





