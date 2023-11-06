import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
    
  if(user === null) {
    return <Navigate to='/' replace />;
  } else if (user) {
    return children;
  }
  
}
