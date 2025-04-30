import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import "./OrderHistory.css"

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const logout = () => {
    // Add your logout logic here
    navigate("/");
  };

  const handleDelete = (_id) => {
    axios.delete(`http://localhost:5000/orders/${_id}`)
      .then(() => {
        setOrders(orders.filter(order => order._id !== _id));
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderIds(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="profile-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/orderhistory" className="active">
              My Orders
            </Link>
          </li>
          <li>
            <Link to="/DeliveryInfo">Delivery Options</Link>
          </li>
        </ul>
        <button
          className="back-btn"
          onClick={() => navigate("/customer-dashboard")}
        >
          &larr; Back to Dashboard
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="profile-content">
        <h1>Order History</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr
                    className={`order-row ${
                      expandedOrderIds.includes(order._id) ? "expanded" : ""
                    }`}
                    onClick={() => toggleExpand(order._id)}
                  >
                    <td>{order.orderId || "N/A"}</td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {order.amount ? `Rs. ${order.amount.toFixed(2)}` : "N/A"}
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleDelete(order._id);
                        }}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedOrderIds.includes(order._id) && (
                    <tr className="order-items-row">
                      <td colSpan="5">
                        <div className="items-container">
                          <h4>Items in this Order:</h4>
                          <ul className="item-list">
                            {order.items?.length > 0 ? (
                              order.items.map((item, idx) => (
                                <li key={idx}>
                                  <span className="item-name">{item.name}</span>{" "}
                                  × {item.quantity} – Rs.{" "}
                                  {item.price.toFixed(2)}
                                </li>
                              ))
                            ) : (
                              <li>No items in this order.</li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default OrderHistory;
