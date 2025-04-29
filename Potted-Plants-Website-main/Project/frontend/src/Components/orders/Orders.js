import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

function Orders() {
  const [orders, setOrders] = useState([]); //State for storing orders

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders") //Fetch orders from backend
      .then((res) => {
        console.log("Fetched Orders:", res.data); //Debugging
        setOrders(res.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/orders/${id}`);
  
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id)); //Remove from UI
        console.log("Order deleted successfully");
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p> //Handles empty state
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.date}</td>
                <td>Rs.{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => deleteHandler(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
