import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/authContext";
import "./DeliveryDashboard.css"

function DeliveryDashboard() {
    const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [partnerData, setPartnerData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/orders/admin/ongoing')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  const handleAssign = (orderId) => {
    const { name, contact, vehicle, status } = partnerData[orderId] || {};
    axios.put(`http://localhost:5000/orders/admin/assign/${orderId}`, {
      name, contact, vehicle, status
    }).then(res => {
      alert('Partner assigned successfully');
      setOrders(prev => prev.map(order => order._id === orderId ? res.data : order));
    }).catch(err => console.error('Error assigning partner:', err));
  };

  const handleChange = (orderId, field, value) => {
    setPartnerData(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], [field]: value }
    }));
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome To Delivery Admin Dashboard {user?.name}!</h2>
      {orders.length === 0 ? <p>No ongoing orders.</p> : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Assign Partner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.deliveryStatus}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={e => handleChange(order._id, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Contact"
                    onChange={e => handleChange(order._id, 'contact', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Vehicle"
                    onChange={e => handleChange(order._id, 'vehicle', e.target.value)}
                  />
                  <select
                    onChange={e => handleChange(order._id, 'status', e.target.value)}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleAssign(order._id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default DeliveryDashboard;
