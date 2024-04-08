import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateAdminRoute = ({ children }) => {
  const isSuperuser = useSelector(state => state.auth.isSuperuser);
  console.log("Priva admin : " , isSuperuser)

  return (
    isSuperuser ? <Outlet/> : <Navigate to='/admin'/>
  );
};

export default PrivateAdminRoute;
