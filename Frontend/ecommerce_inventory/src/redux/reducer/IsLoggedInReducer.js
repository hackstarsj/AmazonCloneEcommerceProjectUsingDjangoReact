import { createSlice } from "@reduxjs/toolkit";
const IsLoggedInReducer =createSlice({
    name: "data",
    initialState:{
        isLoggedIn:false,
        status:"idle",
        error:null
    },
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=true;
        },
        logout:(state,action)=>{
            state.isLoggedIn=false; 
        }
    }
});

export const {login,logout}=IsLoggedInReducer.actions;
export default IsLoggedInReducer.reducer;