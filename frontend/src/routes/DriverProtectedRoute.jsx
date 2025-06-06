import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDriverAuth } from '../context/DriverAuthContext';

export function DriverProtectedRoute({ children }) {
  const { loading, authenticated } = useDriverAuth();

  if (loading) return <div>Loading 123...</div>;
  if (!authenticated) return <Navigate to="/driver/login" replace />;

  return children;
}
