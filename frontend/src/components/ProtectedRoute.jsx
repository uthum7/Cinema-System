// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * Protected Route Component
 * Redirects to signin if user is not authenticated
 * Optionally checks for admin role
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getStoredUser();

  // Not authenticated - redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Admin only route but user is not admin
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role
  return children;
};

export default ProtectedRoute;