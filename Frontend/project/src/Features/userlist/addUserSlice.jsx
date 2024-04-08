import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = 'http://localhost:8000/createUser/'

const initialState = {
    user :[],
    status : 'idle',
    error: null,
}

export const addUser = createAsyncThunk('addUser', (payload)=>{
    axios.post(`${apiUrl}`, payload, {
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

export default addUserSlice.reducer
export const {add, fail} = addUserSlice.actions