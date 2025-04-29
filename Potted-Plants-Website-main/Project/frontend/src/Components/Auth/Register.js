import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });
  const { register, alert, setAlert } = useAuth();

  const { name, email, phone, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert({ message: "Passwords do not match", type: "error" });
    } else {
      register({ name, email, phone, password });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Register</h1>
        {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Full Name" name="name" value={name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Phone Number" name="phone" value={phone} onChange={onChange} minLength="10" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} minLength="6" required />
          </div>
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
