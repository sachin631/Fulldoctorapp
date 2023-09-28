import { createSlice } from "@reduxjs/toolkit";

export  const alertSlice=createSlice({
    name:"alertSlice",
    initialState:{
        loading:false,
        error:false

    },
    reducers:{
        showLoading:(state,action)=>{
            state.loading=true;
        },
        hideLoading:(state,action)=>{
            state.loading=false;
        }
    }
});

export const {showLoading,hideLoading} = alertSlice.actions;