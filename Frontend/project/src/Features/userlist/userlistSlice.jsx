import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../axios/axios';

// const apiUrl = 'http://127.0.0.1:8000/api/users/users/'

// const initialState = {
//     loading : false,
//     users: [],
//     error: null,

// }

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     const response = await axios.get(apiUrl)
//     return response.data
// })

// const userlistSlice = createSlice({
//     name:'users', 
//     initialState,
//     reducers: {
//         deleteUser: (state, action)=>{
//             state.users = state.users.filter((user)=> user.id !== action.payload  )
//         }
//     },
//     extraReducers:builder=>{
//         builder.addCase(fetchUsers.pending, (state) => {
//             state.loading = 'true'
//         })
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {
//             state.loading = 'false'
//             state.users = action.payload
//         })
//         builder.addCase(fetchUsers.rejected, (state, action) => {
//             state.rejected = 'false'
//             state.error = action.error.message
//         })
//     }
// })

// export const {deleteUser} = userlistSlice.actions

// export default userlistSlice.reducer


const fetchapiUrl = 'api/users/users/';

const updateapiurl = 'api/users/user/'

const initialState = {
    loading: false,
    users: [],
    error: null,
};



// fetchUsers thunk
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get(fetchapiUrl);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // createUser thunk
  export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, thunkAPI) => {
      try {
        const response = await axiosInstance.post(fetchapiUrl, userData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // editUser thunk
  export const editUser = createAsyncThunk(
    'users/editUser',
    async ({ id, userData }, thunkAPI) => {
      try {
        const response = await axiosInstance.put(`${updateapiurl}${id}/`, userData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // deleteUser thunk
  export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId, thunkAPI) => {
      try {
        await axiosInstance.delete(`${updateapiurl}${userId}/`);
        return userId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  
  const userlistSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.users.push(action.payload);
        })
        .addCase(editUser.fulfilled, (state, action) => {
          const index = state.users.findIndex((user) => user.id === action.payload.id);
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.users = state.users.filter((user) => user.id !== action.payload);
        });
    },
  });
  

export default userlistSlice.reducer;
