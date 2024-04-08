import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../axios/axios';
import { Link } from 'react-router-dom';

function UserProfile() {
  const apiUrl = 'http://localhost:8000/';
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [isEditing, setIsEditing] = useState(false); // State for tracking edit mode

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('api/users/me/');
        setUser(response.data);
        setEditUser(response.data); // Set initial values for editing
      } catch (error) {
        console.error('Failed to get user', error);
        // Handle error as needed, e.g., redirect to login page
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If the profile pic has been changed, send a multipart/form-data request
      const formData = new FormData();
      Object.entries(editUser).forEach(([key, value]) => {
        if (key === 'profile_pic' && value instanceof File) {
          formData.append(key, value);
        } else if (key !== 'profile_pic') {
          formData.append(key, value);
        }
      });

      await axiosInstance.put(`api/users/user/${user.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // After successful update, refresh the user data
      const updatedUserData = await axiosInstance.get('api/users/me/');
      setUser(updatedUserData.data);
      setEditUser(updatedUserData.data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Update failed:', error);
      // Optionally, provide user feedback about the update failure
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditUser((prevState) => ({
      ...prevState,
      profile_pic: file,
    }));
  };

  console.log(editUser.profile_pic)


  return (
    <div className="container  mx-auto mt-8">
      <div className="max-w-md mx-auto relative bg-white p-8 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <form  onSubmit={handleSubmit}>
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
            {user.profile_pic ? (
              <img
                src={`${apiUrl}${user.profile_pic}`}
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
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
            />
          </div>
          <div className="flex justify-end">
            
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 me-5 rounded"
              >
                Save
              </button>
            
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>

              <Link to={'/'} className="hover:underline absolute left-5 " >Back Home</Link>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
