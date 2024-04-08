import React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deleteUser } from '../Features/userlist/userlistSlice';
import { Link } from 'react-router-dom';

function UsersList({ users }) {
    const dispatch = useDispatch();
    const apiUrl = 'http://localhost:8000/';


    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="even:bg-gray-100">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2 flex flex-row items-center ">
                                {user.profile_pic ? (
                                    <Avatar
                                        alt={user.name}
                                        src={user.profile_pic}// Remove leading "/" from the image path
                                        sx={{ width: 38, height: 38  }}
                                    />
                                ) : (
                                    <Avatar src="/broken-image.jpg" />
                                )}
                                <span className='ms-5'>{user.name}</span>
                            </td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">

                            <Link to={`/users/${user.id}`} className="text-blue-600 hover:underline mr-2">View</Link>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
                                {/* Add Edit functionality */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
