import React, { Suspense, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import axiosInstance from './axios/axios';
import Userlogin from './pages/Userlogin';
import Loading from './components/Loading';
import UserSignup from './pages/UserSignup';
import PrivateRoute from './pages/PrivateRoute';
import UserProfile from './pages/UserProfile';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Features/auth/authSlice';
import CreateUser from './pages/CreateUser';
import UserDetails from './pages/UserDetails';

const Userhomepage = React.lazy(() => import('./pages/Userhome'));

function App() {
  const refreshToken = localStorage.getItem("refreshToken")
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()


  const isSuperuser = useSelector(state => state.auth.isSuperuser);
  console.log("App - super : " , isSuperuser)


  console.log("The app.....!!!!!!!")

  useEffect(() => {
    const fetchNewAccessToken = async () => {
        try {
            if (refreshToken) {
                const response = await axiosInstance.post('api/users/login/refresh/', { refresh: refreshToken });
                localStorage.setItem('accessToken', response.data.access);
            } else {
                throw new Error('Refresh token not available');
            }
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            // Handle error as needed, e.g., redirect to login page
        }
    };

  //   const fetchUser= async () => {
  //     try {
  //         dispatch(getUser)            
  //     } catch (error) {
  //         console.error('Failed to refresh access token:', error);
  //         // Handle error as needed, e.g., redirect to login page
  //     }
  // };



    fetchNewAccessToken();
}, [refreshToken]);


  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Routes>
        <Route element={<PrivateRoute/>}>
              <Route path='/' element={<Userhomepage/>} />
              <Route path='/profile' element={<UserProfile/>} />  
          </Route>

          <Route path='/admin' element={<AdminLogin/>} />
          <Route element={<PrivateAdminRoute />}>
              
              <Route path='/adminhome' element={<AdminHome/>} />
              <Route path='/users/createuser' element={<CreateUser/>} />
              <Route path="/users/:userId" element={<UserDetails />} />

          </Route>


          <Route path='/signup' element={<UserSignup />} />
          <Route path='/login' element={<Userlogin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
