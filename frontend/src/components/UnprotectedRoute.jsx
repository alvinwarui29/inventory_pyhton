import React from 'react';
import { Navigate } from 'react-router-dom';

const UnprotectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); 

  return token ? <Navigate to="/" replace /> : <Component {...rest} />;
};

export default UnprotectedRoute;
