import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";


function DeliveryBook() {
  const [deliveries, setDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'self', 'gift'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();


  // Fetch delivery records
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/Delivery")
      .then((res) => {
        console.log("Fetched deliveries:", res.data);
        setDeliveries(res.data.deliveries || []);
      })
      .catch((error) => console.error("Error fetching deliveries:", error))
      .finally(() => setLoading(false));
  }, []);

  // Filter deliveries based on active tab
  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab === 'all') return true;
    return delivery.orderType === activeTab;
  });

  // Delete delivery
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

  const handleProceed = () => {
    navigate('/ordersucess');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <p>Loading deliveries...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/orderhistory">My Orders</Link></li>
          <li><Link to="/DeliveryInfo" className="active">Delivery Options</Link></li>
          <li><Link to="/loyalty">Loyalty Points</Link></li>
        </ul>
        <button className="back-btn" onClick={() => navigate("/customer-dashboard")}>
          &larr; Back to Dashboard
        </button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>
      <main className="profile-content">  
    <div className="delivery-book" style={{
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem"
      }}>
        <h2 style={{
          color: "#2c3e50",
          margin: 0,
          fontSize: "1.8rem"
        }}>Delivery Records</h2>
      </div>

      {/* Delivery Type Tabs */}
      <div style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "1px solid #eee",
        paddingBottom: "1rem"
      }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === 'all' ? "#3498db" : "transparent",
            color: activeTab === 'all' ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
        >
          All Deliveries
        </button>
        <button
          onClick={() => setActiveTab('self')}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === 'self' ? "#3498db" : "transparent",
            color: activeTab === 'self' ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
        >
          Buy for Myself
        </button>
        <button
          onClick={() => setActiveTab('gift')}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === 'gift' ? "#3498db" : "transparent",
            color: activeTab === 'gift' ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
        >
          Send as Gift
        </button>
      </div>
    
      <div className="delivery-list" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "1.5rem"
      }}>
        {filteredDeliveries.length === 0 ? (
          <p style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            color: "#777",
            fontSize: "1.1rem"
          }}>
            {activeTab === 'all' ? 'No deliveries found.' : 
             activeTab === 'self' ? 'No "Buy for Myself" deliveries found.' : 
             'No "Send as Gift" deliveries found.'}
          </p>
        ) : (
          filteredDeliveries.map((delivery) => (
            <div 
              key={delivery._id} 
              className="card"
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
                padding: "1.5rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
            >
              <h3 style={{
                color: "#3498db",
                marginTop: "0",
                marginBottom: "1rem",
                borderBottom: "1px solid #eee",
                paddingBottom: "0.5rem"
              }}>
                {delivery.orderType === 'gift' ? 'Gift Recipient' : 'Recipient'}:{' '}
                {delivery.orderType === 'gift' ? 
                  `${delivery.recipitionFirstName} ${delivery.recipitionLastName}` : 
                  `${delivery.firstName} ${delivery.lastName}`}
              </h3>
              
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Delivery ID:</strong> {delivery._id}
              </p>
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Order Type:</strong> {delivery.orderType === 'gift' ? 'Send as Gift' : 'Buy for Myself'}
              </p>
              
              {delivery.orderType === 'gift' && (
                <>
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong style={{ color: "#555" }}>From:</strong> {delivery.firstName} {delivery.lastName}
                  </p>
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong style={{ color: "#555" }}>Gift Message:</strong> {delivery.giftMessage}
                  </p>
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong style={{ color: "#555" }}>Delivery Date:</strong> {new Date(delivery.deliveryDate).toLocaleDateString()}
                  </p>
                </>
              )}
              
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Phone:</strong> {delivery.orderType === 'gift' ? delivery.recipitionPhone : delivery.phone}
              </p>
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Address:</strong> {delivery.orderType === 'gift' ? delivery.recipitionAddress : delivery.address}
              </p>
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Email:</strong> {delivery.orderType === 'gift' ? delivery.recipitionEmail : delivery.email}
              </p>
              
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Billing Name:</strong> {delivery.billingName}
              </p>
              <p style={{ margin: "0.5rem 0" }}>
                <strong style={{ color: "#555" }}>Billing Address:</strong> {delivery.billingAddress}, {delivery.billingCity}, {delivery.billingPostcode}
              </p>
              
              <div 
                className="card-actions"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: "1.5rem"
                }}
              >
                <Link 
                  to={`/UpdateDelivery/${delivery._id}`}
                  className="btn edit-btn"
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#3498db",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    transition: "background-color 0.3s"
                  }}
                >
                  Edit
                </Link>
                <button 
                  className="btn delete-btn" 
                  onClick={() => handleDelete(delivery._id)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    transition: "background-color 0.3s"
                  }}
                >
                  Delete
                </button>
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