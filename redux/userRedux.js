import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        user: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        signupStart: (state)=>{
            state.isFetching=true;
            state.error=null;
            
        },
        signupSuccess: (state, action)=>{
            state.isFetching=false;
            state.error= null;
            state.user = action.payload;
        },
        signupFailure: (state, action)=>{
            state.isFetching=false;
            state.error = action.payload;
            state.user = null;
        },
        loginStart: (state)=>{
            state.isFetching=true;
            state.error=null;
        },
        loginSuccess: (state, action)=>{
            state.isFetching=false;
            state.error= null;
            state.user=action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching=false;
            state.error= action.payload;
            state.user= null;
        },
        logoutStart: (state)=>{
            state.isFetching=true
            state.error=null;

        },
        logoutSuccess: (state)=>{
            state.isFetching=false;
            state.error= null;
            state.user=null;
        },
        logoutFailure: (state, action) => {
            state.isFetching=false;
            state.error= action.payload;
        },
        updateUserStart: (state)=>{
            state.isFetching=true
            state.error=null;

        },
        updateUserSuccess: (state, action)=>{
            state.isFetching=false;
            state.error= null;
            state.user=action.payload;
        },
        updateUserFailure: (state, action) => {
            state.isFetching=false;
            state.error= action.payload;
        },
        

    }
});

export const { loginStart,loginSuccess,loginFailure, logoutStart, logoutSuccess, logoutFailure, signupStart, signupSuccess, signupFailure, updateUserStart, updateUserSuccess, updateUserFailure} = userSlice.actions;
export default userSlice.reducer;