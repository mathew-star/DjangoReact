import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Features/auth/authSlice";
import userlistSliceReducer from "./Features/userlist/userlistSlice"; 

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        users: userlistSliceReducer, 
    },
});