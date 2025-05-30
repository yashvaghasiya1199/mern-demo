import { createSlice } from "@reduxjs/toolkit";
import { userLoginAction, userMeAction, userSignupAction } from "../actions/auth.action";

const userSlice = createSlice({
    name: "userslice",
    initialState: {
        userLogin:false,
        userInformation:[],
        rideinformation:null,
        isPending:null,
        message:[],
        isError:null
    },
    reducers: {
     userlogin:(state,action)=>{
        state.userLogin=true
     },
    userlogout:(state,action)=>{
       state.userLogin=false
    },
    ridedata:(state,action)=>{
      state.rideinformation = action.payload
    },
    
    },
    extraReducers: (builder)=>{
      builder.addCase(userLoginAction.pending ,(state,action)=>{
        state.isPending=true
      }),
      builder.addCase(userLoginAction.fulfilled , (state,action)=>{
        state.isPending = false,
        state.message = action.payload
      }),
      builder.addCase(userLoginAction.rejected,(state,action)=>{
        state.isError =true,
        state.message=action.payload
      })

      //user signup
      builder.addCase(userSignupAction.pending,(state,action)=>{
        state.isPending=true
      }),
      builder.addCase(userSignupAction.fulfilled,(state,action)=>{
        state.isPending=false
        state.message = action.payload
      }),
      builder.addCase(userSignupAction.rejected,(state,action)=>{
        state.isError=true
        state.message = action.payload
      })

      builder.addCase(userMeAction.pending,(state,action)=>{
        state.isPending=true
      }),
      builder.addCase(userMeAction.fulfilled,(state,action)=>{
        state.isPending=false
        state.userInformation = action.payload
      }),
      builder.addCase(userMeAction.rejected,(state,action)=>{
        state.isError=true
        state.userInformation = action.payload
      })
    }
});

export const {userlogin,userlogout,ridedata} = userSlice.actions

export default userSlice.reducer;



