import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./AddressBook.css";
import Nav from "../Layout/Nav";

function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // 1. Get token properly from storage
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect if no token
          return;
        }

        // 2. Verify token format
        console.log('Token being sent:', token); // Debug log

        // 3. Make request with proper headers
        const res = await axios.get('http://localhost:5000/address', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAddresses(res.data);
      } catch (err) {
        console.error('Auth error:', error.response?.data);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchAddresses();
  }, [navigate]); // Empty dependency array means this runs once on mount

  // Delete address handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAddresses(prev => prev.filter(address => address._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete address');
      console.error("Error deleting address:", err);
    }
  };

  if (loading) return <div>Loading addresses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Nav />
      <div className="address-book">
        <h2>Address Book</h2>
        <button className="btn" onClick={() => navigate("/AddAddress")}>
          Add New Address
        </button>

        <div className="address-list">
          {addresses.length === 0 ? (
            <p>No addresses found. Add your first address!</p>
          ) : (
            addresses.map((address) => (
              <div key={address._id} className="card">
                <h3>{address.type}</h3>
                <p>{address.street}</p>
                <p>{`${address.city}, ${address.state} ${address.zipcode}`}</p>
                <div className="card-actions">
                  <Link to={`/UpdateAddress/${address._id}`} className="btn edit-btn">
                    Edit
                  </Link>
                  <button 
                    className="btn delete-btn" 
                    onClick={() => handleDelete(address._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressBook;