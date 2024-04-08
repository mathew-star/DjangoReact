import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

import AdminHeader from '../components/Adminheader';
import UsersList from '../components/UsersList';
import { fetchUsers } from '../Features/userlist/userlistSlice';
import { Link } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);



  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  return (
    <>
        <div className=''>
            
            <div className='flex flex-row justify-between'>

            <h1 className='text-center text-4xl mt-5 ms-10'>Welcome Administrator </h1>
            <div className='mt-5 me-4'>
            <AdminHeader/>
            </div>
            </div>

            <div className='px-20 py-26 mt-10'>
                <p className='text-3xl'>Users List </p>

            {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <UsersList users={users} />
          )}

          <div>
            <Link to={'/users/createuser'}> 
            <span className='border-solid px-4 py-4'>Create New User</span>
            <Icon
                baseClassName="fas"
                className="fa-plus-circle"
                sx={{ color: green[500] }}
            /> 
            </Link>
                
          </div>

            </div>

        



        </div>

    </>
  )
}

export default AdminHome
