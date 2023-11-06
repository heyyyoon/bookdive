import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

export default function ProtectedPage({children}) {
  const location = useLocation();
  const params = useParams();

  if (location.state && params) {
    return children;
  } else {
    return <Navigate to='/' replace />;
  }
}
