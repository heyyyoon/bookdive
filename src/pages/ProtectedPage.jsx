import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

export default function ProtectedPage({children}) {
  const location = useLocation();
  const params = useParams();

  if (location.state && params) {
    console.log('aa')
    return children;
  } else {
    console.log('bb')
    return <Navigate to='/' replace />;
  }
}
