import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/authContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, Tab } from '@mui/material';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { user, logout } = useAuth();
  const [weeklyData, setWeeklyData] = useState([]);
  const [tab, setTab] = useState('Admins');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });
      console.log("Users API response:", res.data);

  
      if (res.data.success) {
        
        return res.data.data;
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
      return [];
    }
  };
  
  
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
    processWeeklyData(fetchedUsers);
    console.log("Fetched user roles:", fetchedUsers.map(u => u.role));
  };
  loadUsers();
}, []);

  

  useEffect(() => {
    // Apply tab and date filtering
    const filtered = users.filter((user) => {
      // Tab filter
      const matchesTab = {
        Admins: ['UserAdmin', 'ProductAdmin', 'DeliveryAdmin'].includes(user.role),
        Customers: user.role === 'customer',
        'Delivery Partners': user.role === 'DeliveryPartners'
      }[tab];

      // Date filter
      const registeredDate = new Date(user.date);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;

      const matchesDate =
        (!fromDate || registeredDate >= fromDate) &&
        (!toDate || registeredDate <= toDate);

      return matchesTab && matchesDate;
    });

    setFilteredUsers(filtered);
  }, [users, tab, dateRange]);

  const exportToCSV = () => {
    const dataToExport = filteredUsers.map(({ name, email, role, phone, date }) => ({
      Name: name,
      Email: email,
      Role: role,
      Phone: phone,
      Registered: format(new Date(date), 'yyyy-MM-dd')
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    XLSX.writeFile(workbook, `UserReport-${tab}-${Date.now()}.xlsx`);

    
  };

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

  return (
    <div className="admin-dashboard bg-white max-w-6xl mx-auto p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Welcome to User Admin Dashboard, {user.name}!</h1>
  
      {/* Tabs */}
      <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
        <Tab label="Admins" value="Admins" />
        <Tab label="Customers" value="Customers" />
        <Tab label="Delivery Partners" value="Delivery Partners" />
      </Tabs>
  
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <div>
          <label className="block text-sm text-gray-700">From</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            className="border px-3 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">To</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            className="border px-3 py-1 rounded"
          />
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
          onClick={exportToCSV}
        >
          Download Report
        </button>
      </div>
  
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
  <tr>
    {tab === 'Delivery Partners' ? (
      <>
        <th className="border px-4 py-2 text-left">Name</th>
        <th className="border px-4 py-2 text-left">Vehicle Type</th>
        <th className="border px-4 py-2 text-left">Vehicle Number</th>
        <th className="border px-4 py-2 text-left">Phone</th>
        <th className="border px-4 py-2 text-left">Date</th>
        <th className="border px-4 py-2 text-left">Action</th>
      </>
    ) : (
      <>
        <th className="border px-4 py-2 text-left">Name</th>
        <th className="border px-4 py-2 text-left">Email</th>
        <th className="border px-4 py-2 text-left">Role</th>
        <th className="border px-4 py-2 text-left">Phone</th>
        <th className="border px-4 py-2 text-left">Date</th>
        <th className="border px-4 py-2 text-left">Action</th>
      </>
    )}
  </tr>
</thead>
<tbody>
  {filteredUsers.map((user) => (
    <tr key={user._id} className="hover:bg-gray-50">
      {tab === 'Delivery Partners' ? (
        <>
          <td className="border px-4 py-2">{user.name}</td>
          <td className="border px-4 py-2">{user.vehicleType || '-'}</td>
          <td className="border px-4 py-2">{user.vehicleNumber || '-'}</td>
          <td className="border px-4 py-2">{user.phone}</td>
          <td className="border px-4 py-2">{format(new Date(user.date), 'yyyy-MM-dd')}</td>
          <td>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="border px-4 py-2">{user.name}</td>
          <td className="border px-4 py-2">{user.email}</td>
          <td className="border px-4 py-2">{user.role}</td>
          <td className="border px-4 py-2">{user.phone}</td>
          <td className="border px-4 py-2">{format(new Date(user.date), 'yyyy-MM-dd')}</td>
          <td>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>

        </table>
      </div>
  
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found for this filter.</p>
      )}
      <h2>Customer Registrations This Week</h2>
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
