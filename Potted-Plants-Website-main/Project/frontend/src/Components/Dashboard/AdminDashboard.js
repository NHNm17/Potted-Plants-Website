import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      console.log("Response Data:", res.data);
      processWeeklyData(res.data.data);

      if (res.data && Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else {
        console.error("Expected an array but got:", res.data);
      }
    } catch (err) {
      console.error(
        "Error fetching users:",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  //DELETE USER FUNCTION
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return; // Confirmation dialog

    try {
      await axios.delete(`http://localhost:5000/admin/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Remove from UI
    } catch (err) {
      console.error(
        "Error deleting user:",
        err.response?.data?.message || err.message
      );
    }
  };

  const processWeeklyData = (users) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = Array(7).fill(0);

    users.forEach((user) => {
      const day = new Date(user.date).getDay();
      counts[day]++;
    });

    const data = weekDays.map((day, index) => ({
      day,
      count: counts[index],
    }));

    setWeeklyData(data);
  };

  const handleDownloadReport = () => {
    const csvHeader = ["Name,Email,Role,Join Date\n"];
    const csvRows = users.map(
      (user) =>
        `${user.name},${user.email},${user.role},${new Date(
          user.date
        ).toLocaleDateString()}`
    );

    const csvContent =
      "data:text/csv;charset=utf-8," + csvHeader + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_report.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to User-Admin Dashboard, {user?.name}!</h1>
      <div className="user-list-header">
        <h2>User List</h2>
        <button onClick={handleDownloadReport} className="download-btn">
        Download Report</button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <h2>User Registrations This Week</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData}>
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
