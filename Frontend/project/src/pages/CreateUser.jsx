import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Features/userlist/userlistSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

function CreateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createError, setcreateError] = useState('');


  const { loading, error } = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age:'',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        }),


        onSubmit: async (values) => {
            try {
                await dispatch(createUser(values));
                navigate('/adminhome')
                setcreateError('');
            } catch (err) {
                console.log(err)
            }
        },
        
    });

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5">Create New User</h2>
            {createError && <div className="text-red-500 mb-4">{createError}</div>}

            {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}

            <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 mt-1">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 mt-1">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        {...formik.getFieldProps('age')}
                    />
                    {formik.touched.age && formik.errors.age ? (
                        <div className="text-red-500 mt-1">{formik.errors.age}</div>
                    ) : null}
                </div>


                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 mt-1">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="text-red-500 mt-1">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Create User
                </button>
            </form>
        </div>
    );
}

export default CreateUser;

