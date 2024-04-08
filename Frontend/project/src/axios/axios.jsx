

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//           throw new Error('Refresh token not available');
//         }

//         // Use refreshToken to request new tokens from the server
//         const response = await axiosInstance.post('/api/users/login/refresh/', { refresh: refreshToken });

//         // Update tokens in localStorage
//         localStorage.setItem('accessToken', response.data.access);

//         // Retry original request with new tokens
//         originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token failure
//         console.error('Failed to refresh token:', refreshError);
//         // Redirect user to login page or handle as needed
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
