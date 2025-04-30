import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Components/context/authContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  console.log("Admin Route Check:", user, isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  if (user?.role !== "UserAdmin" && user?.role !== "ProductAdmin" &&user?.role !== "DeliveryAdmin") {
    return <Navigate to="/dashboard" replace />; // Redirect non-admins
  
  }

  return children;
};


export default AdminRoute;