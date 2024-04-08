import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = 'http://localhost:8000/users'

const initialState = {
    user :[],
    status : 'idle',
    error: null,

}

export const addUser = createAsyncThunk('addUser', (payload)=>{
    axios.post(`${apiUrl}/userregis/`, payload, {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    })
})

const addUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        add : (state, action) => {
            state.user = action.payload
        },
        fail : (state, action) => {
            state.error = action.error.message
        }
    }
})



const updateUserInServer = async (userId, updatedUserData) => {

    const response = await axios.put(`${apiUrl}/${userId}/`, updatedUserData, {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    });
    return response.data;
  };


export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, updatedUserData }) => {
    const response = await updateUserInServer(userId, updatedUserData);
    return response;
}
);

const userEditSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers(builder) {
      builder.addCase(updateUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        });
    },
  });



// export const selectUser = state => state.userEdit.user
// export const getUserDetailStatus = state => state.userEdit.status

export default userEditSlice.reducer

