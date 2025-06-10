import { createSlice } from "@reduxjs/toolkit";
import { bookRideAction, rideFindAction, paymentAction, AllUserRidesAction,  userProfileUpdateAction } from "../actions/user.action";

const userSlice = createSlice({
    name: "userslice",
    initialState: {
        userLogin:false,
        userMessage:null,
        rideinformation:null,
        userPending:null,
        // userMessage:[],
        userError:null
    },
    reducers: {
     userlogin:(state)=>{
        state.userLogin=true
     },
    userlogout:(state)=>{
       state.userLogin=false
    },
    ridedata:(state,action)=>{
      state.rideinformation = action.payload
    },
    clearUserData:(state)=>{
      state.userError = false
      state.userMessage = []
    }
    },
    extraReducers: (builder)=>{
      builder.addCase(rideFindAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(rideFindAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(rideFindAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })
      builder.addCase(bookRideAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(bookRideAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(bookRideAction.rejected,(state,action)=>{
        state.userPending = false
        state.userError=true
        state.userMessage = action.payload
      })
      builder.addCase(paymentAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(paymentAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      }),
      builder.addCase(paymentAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })

      builder.addCase(userProfileUpdateAction.pending,(state)=>{
        state.userPending =true
      }),
      builder.addCase(userProfileUpdateAction.fulfilled,(state,action)=>{
        state.userPending =false
        state.userMessage = action.payload
      })
      builder.addCase(userProfileUpdateAction.rejected,(state,action)=>{
        state.userError=true
        state.userMessage = action.payload
      })
     
    }
});

export const {userlogin,userlogout,ridedata,clearUserData} = userSlice.actions

export default userSlice.reducer;



