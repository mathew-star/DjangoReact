import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children , ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  );
};

export default PrivateRoute;
