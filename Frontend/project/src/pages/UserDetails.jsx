import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../axios/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UserDetails() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`api/users/user/${userId}`);
        setEditUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to get user', error);
        // Handle error as needed
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editUser.name);
      formData.append('email', editUser.email);
      if (editUser.profile_pic instanceof File) {
        formData.append('profile_pic', editUser.profile_pic);
      }

      await axiosInstance.put(`api/users/user/${userId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/adminhome')
    //   const updatedUserData = await axiosInstance.get('api/users/me/');
    //   setEditUser(updatedUserData.data);

    } catch (error) {
      console.error('Update failed:', error);
      // Optionally, provide user feedback about the update failure
    }
  };




  const handleChange = (e) => {
    const { name, files, value } = e.target;
  
    if (name === 'profile_pic' && files && files[0]) {
      setEditUser((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the File object directly
      }));
    } else {
      setEditUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  console.log(editUser.profile_pic)
  

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto relative bg-white p-8 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editUser.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editUser.email || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePic" className="block text-gray-700 font-bold mb-2">
              Profile Picture
            </label>
            {editUser.profile_pic ? (
              <img
                src={editUser.profile_pic} 
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-solid border-b-gray-600 shadow-black mb-2"
              />
            ) : (
              <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-34 h-15 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
            <input
              type="file"
              id="profilePic"
              name="profile_pic"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 me-5 rounded">
              Save
            </button>
            <Link to={'/adminhome'} className="hover:underline text-xl font-normal">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
