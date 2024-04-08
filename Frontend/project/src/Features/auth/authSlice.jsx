import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

const BASE_URL = 'http://127.0.0.1:8000';




// Action creator to fetch user data
// export const getUser = createAsyncThunk(

//     async (_, thunkAPI) => {
//         try {
//             // Get access token from local storage
//             const accessToken = localStorage.getItem('accessToken');
            
//             // Fetch user data using access token as bearer token
//             // const res = await fetch(`${BASE_URL}/api/users/me/`, {
//             //     method: 'GET',
//             //     headers: {
//             //         Accept: 'application/json',
//             //         Authorization: `Bearer ${accessToken}`,
//             //     },
//             // });

//             const res = await axiosInstance.get('api/users/me/');

//             const data = await res.json();

//             console.log(data)

//             if (res.status === 200) {
//                 localStorage.setItem('user',JSON.stringify(data));
//                 return data;
//             } else {
//                 return thunkAPI.rejectWithValue(data);
//             }
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data);
//         }
//     }
// );


// // Action creator to login
// export const login = createAsyncThunk(
//     'auth/login',
//     async ({ email, password }, thunkAPI) => {
//         const body = JSON.stringify({
//             email,
//             password,
//         });

//         try {
//             const res = await fetch(`${BASE_URL}/api/users/login/`, {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body,
//             });

//             const data = await res.json();
//             console.log(data)

//             if (res.status === 200) {
//                 // Store tokens in local storage
//                 localStorage.setItem('accessToken', data.access);
//                 localStorage.setItem('refreshToken', data.refresh);
                
//                 // Dispatch getUser action to fetch user data using access token
//                 const { dispatch } = thunkAPI;

//                 await dispatch(getUser());
                
//                 return data;
//             } else {
//                 return thunkAPI.rejectWithValue(data);
//             }
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data);
//         }
//     }
// );



// // Action creator to logout
// export const logout = createAsyncThunk(
//     'auth/logout',
//     async (_, thunkAPI) => {
//         try {
//             const res = await fetch(`${BASE_URL}/api/users/logout/`, {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                 },
//             });

//             const data = await res.json();

//             if (res.status === 200) {
//                 // Clear tokens from local storage on logout
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
                
//                 return data;
//             } else {
//                 return thunkAPI.rejectWithValue(data);
//             }
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data);
//         }
//     }
// );

// const initialState = {
//     isAuthenticated: !!localStorage.getItem('accessToken'),
//     isSuperuser: false,
//     user: null,
//     error:null,
//     loading: false,
// };

// // Create auth slice
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setIsSuperuser: (state, action) => { // Added setIsSuperuser reducer
//             state.isSuperuser = action.payload;
//         },
//     },
//     extraReducers: builder => {
//         builder
//             .addCase(login.pending, state => {
//                 state.loading = true;
//                 state.error = null; 
//             })
//             .addCase(login.fulfilled, state => {
//                 state.loading = false;
//                 state.isAuthenticated = true;
//             })
//             .addCase(login.rejected, (state,action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(getUser.pending, state => {
//                 state.loading = true;
//             })
//             .addCase(getUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.isSuperuser = action.payload.is_superuser; 
//             })
//             .addCase(getUser.rejected, state => {
//                 state.loading = false;
//             })
//             .addCase(logout.pending, state => {
//                 state.loading = true;
//             })
//             .addCase(logout.fulfilled, state => {
//                 state.loading = false;
//                 state.isAuthenticated = false;
//                 state.user = null;
//             })
//             .addCase(logout.rejected, state => {
//                 state.loading = false;
//             });
//     },
// });

// export default authSlice.reducer;


export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        const body = JSON.stringify({
            email,
            password,
        });

        try {
            const res = await fetch(`${BASE_URL}/api/users/login/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            });

            const data = await res.json();

            if (res.status === 200) {

                 localStorage.setItem('accessToken', data.access);
                 localStorage.setItem('refreshToken', data.refresh);

                const { dispatch } = thunkAPI;
                dispatch(getUser());
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, thunkAPI) => {
        try {
            // Get access token from local storage
            const accessToken = localStorage.getItem('accessToken');
            
            // Fetch user data using access token as bearer token
            const res = await fetch(`${BASE_URL}/api/users/me/`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await res.json();

            console.log(data);
            if (res.status === 200) {
                // Store user object as JSON string in local storage
                localStorage.setItem('user', JSON.stringify(data));
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('/api/users/logout', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            const data = await res.json();

            if (res.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    isAuthenticated: localStorage.getItem('accessToken')? true: false,
    isSuperuser: false,
    user: null,
    loading: false,
    error:null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
                state.error = null; 
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isSuperuser = action.payload?.is_superuser ?? false; 
            })
            .addCase(getUser.rejected, state => {
                state.loading = false;
            })
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, state => {
                state.loading = false;
            });
    },
});

export default authSlice.reducer;
