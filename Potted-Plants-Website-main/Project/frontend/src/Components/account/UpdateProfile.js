import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';
import axios from 'axios';
import './Update.css';

function UpdateProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: '' // Do NOT pre-fill password for security reasons
      });
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data);
      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        password: ''
      });
    } catch (err) {
      console.error('Failed to fetch user:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(
            'http://localhost:5000/auth/update',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Update Response:", response.data);

        if (response.data && response.data.user) {
            setUser(response.data.user);
            navigate('/profile');
        } else {
            throw new Error("Unexpected server response");
        }
        
    } catch (err) {
        console.error("Update Error:", err);
        
        setError(
            err.response?.data?.message || 
            err.message || 
            "Update failed"
        );
    } finally {
        setLoading(false);
    }
};

  if (loading) return <div className="loading">Loading profile data...</div>;

  return (
    <div className="update-profile">
      <Link to='/profile' className="back-link">Back</Link>
      <h2>Update Profile</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            maxLength={10}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter new password (optional)"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
