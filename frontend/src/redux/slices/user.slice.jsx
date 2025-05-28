import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userslice",
    initialState: {
        userLogin:false
    },
    reducers: {
     userlogin:(state,action)=>{
        state.userLogin=true
     },
    userlogout:(state,action)=>{
       state.userLogin=false
    }
    }
});

export const {userlogin,userlogout} = userSlice.actions

export default userSlice.reducer;



